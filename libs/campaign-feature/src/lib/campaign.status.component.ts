import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/company/company.interface';
import { Client } from 'src/app/client/client.interface';
import { Campaign } from 'src/app/campaign/campaign.interface';
import { Store, select } from '@ngrx/store';
import * as importEntity from 'src/app/import/import.entity';
import * as feedbackEntity from 'src/app/feedback/feedback.entity';
import { Observable, Subscription } from 'rxjs';
import { IFeedback, Feedback, ReportParticipant, ReportRater } from 'src/app/feedback/feedback.interface';
import { Rater } from 'src/app/rater/rater.interface';
import { Participant } from 'src/app/participant/participant.interface';
import { Associate } from 'src/app/associate/associate.interface';
import { IImport } from 'src/app/import/import.interface';
import { LoadImportAction } from 'src/app/import/import.action';
import { LoadFeedbackAction } from 'src/app/feedback/feedback.action';
import { RELATIONSHIP_DATA } from 'src/app/rater/relationship.data';
import { FEEDBACK_STATUS, enumFeedbackStatus } from 'src/app/feedback/feedback.data';
import * as _ from 'lodash';
import { ExportService } from '../export/export.service';

@Component({
  selector: 'hrcatalyst-campaign.status',
  templateUrl: './campaign.status.component.html',
  styleUrls: ['./campaign.status.component.css']
})
export class CampaignStatusComponent implements OnDestroy, OnInit {
  selectedCompany: Company;
  selectedClient: Client;
  selectedCampaign: Campaign;

  feedbackState$: Observable<IFeedback[]>;
  feedbackSubscription$: Subscription;
  feedbacks: Feedback[] = null;

  importState$: Observable<IImport[]>;
  importSubscription$: Subscription;
  associates: Associate[];
  participants: Participant[];
  campaigns: Campaign[];
  raters: Rater[];

  source: Associate[];

  reportData: Array<ReportParticipant>;

  constructor(private router: Router, private feedbackStore: Store<feedbackEntity.FeedbackState>,
    private importStore: Store<importEntity.ImportState>, private exportService: ExportService) {
    const xtra = this.router.getCurrentNavigation().extras.state;
    if (xtra != null) {
      this.selectedCompany = xtra.company;
      this.selectedClient = xtra.client;
      this.selectedCampaign = xtra.campaign;
    }

    this.feedbackState$ = this.feedbackStore.select(feedbackEntity.selectAll);

    this.feedbackSubscription$ = this.feedbackState$.subscribe((state) => {
        this.feedbacks = state;
    });

    this.importState$ = this.importStore.select(importEntity.selectAll);

    this.importSubscription$ = this.importStore.pipe(select((state: any) => state)).subscribe((state) => {
      if (state.import.associates != null) {
          this.associates = state.import.associates;
      }

      if (state.import.participants != null) {
          this.participants = state.import.participants.filter(p => p.campaignId === this.selectedCampaign.id);
      }

      if (state.import.campaigns != null) {
          this.campaigns = state.import.campaigns.filter(c => c.id === this.selectedCampaign.id);
      }

      if (state.import.raters != null) {
          this.raters = state.import.raters;
      }
      this.loadReportParticipants();
    });
  }

  ngOnInit() {
    this.feedbackStore.dispatch(new LoadFeedbackAction());
    this.importStore.dispatch(new LoadImportAction());
  }

  ngOnDestroy() {
    if (this.feedbackSubscription$ != null) {
      this.feedbackSubscription$.unsubscribe();
    }

    if (this.importSubscription$ != null) {
      this.importSubscription$.unsubscribe();
    }
  }

  loadReportParticipants() {
    if (this.participants !== null && this.raters !== null && this.feedbacks !== null && this.associates !== null) {
      const reportData = new Array<ReportParticipant>();
      this.participants.forEach(p => {
        const participant = this.associates.find(pa => pa.id === p.associateId);
        const raters = this.raters.filter(r => r.participantId === p.associateId);

        if (participant !== undefined) {
          const d = new ReportParticipant();

          const data = new Array<ReportRater>();
          d.id = participant.id;
          d.firstName = participant.firstName;
          d.lastName = participant.lastName;

          d.raters = 0;
          d.feedback = 0;
          d.unsolicited = 0;
          d.declined = 0;
          d.pending = 0;

          raters.forEach(r => {
            d.raters++;
            const rater = this.associates.filter(ra => ra.id === r.associateId);
            const feedback = this.feedbacks.filter(f => f.raterId === r.associateId && f.participantId === d.id);

            if (rater.length > 0) {
              const e = new ReportRater();

              e.firstName = rater[0].firstName;
              e.lastName = rater[0].lastName;
              e.relationship = RELATIONSHIP_DATA[r.relationship].name;
              e.status = feedback.length > 0 ? feedback[0].status : FEEDBACK_STATUS[enumFeedbackStatus.PENDING].name;

              if (e.status.toLowerCase() === FEEDBACK_STATUS[enumFeedbackStatus.RECEIVED].name.toLowerCase()) {
                d.feedback++;
              } else if (e.status.toLowerCase() === FEEDBACK_STATUS[enumFeedbackStatus.SUBMITTED].name.toLowerCase()) {
                d.feedback++;
              } else if (e.status.toLowerCase() === FEEDBACK_STATUS[enumFeedbackStatus.UNSOLICITED].name.toLowerCase()) {
                d.unsolicited++;
              } else if (e.status.toLowerCase() === FEEDBACK_STATUS[enumFeedbackStatus.DECLINED].name.toLowerCase()) {
                d.declined++;
              } else if (e.status.toLowerCase() === FEEDBACK_STATUS[enumFeedbackStatus.PENDING].name.toLowerCase()) {
                d.pending++;
              }

              data.push(e);
            }
            d.data = data.sort((a, b) => a.lastName < b.lastName ? -1 : 1);
          });
          reportData.push(d);
        }

        this.reportData =  _.uniqBy(reportData.sort((a, b) => a.lastName < b.lastName ? -1 : 1), 'id');
      });
    }
  }

  chr4() {
    return Math.random().toString(16).slice(-4);
  }

  uniqueID() {
    return this.chr4() + this.chr4() + this.chr4();
  }

  uniqueName() {
    return this.selectedCampaign.name + '-' + this.uniqueID();
  }

  onBackClicked() {
    this.router.navigate(['/campaign'], { state: { company: this.selectedCompany, client: this.selectedClient} });
  }

  onDownload() {
    const filename = this.uniqueName();

    const reportData = new Array<Object>();

    this.reportData.forEach(p => {
      reportData.push(p);

      if (p.data !== undefined) {
        p.data.forEach(r => {
          reportData.push(r);
        });
      }
    });

    this.exportService.exportExcel(reportData, filename);
  }
}




