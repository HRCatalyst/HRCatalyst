import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBase } from 'src/app/shared/form.base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import readXlsxFile from 'read-excel-file';
import { schemaImportParticipant, enumImportParticipant } from './participant.schema';
import { Observable, Subscription } from 'rxjs';
import { Associate, IAssociate } from 'src/app/associate/associate.interface';
import * as participantEntity from 'src/app/participant/participant.entity';
import * as associateEntity from 'src/app/associate/associate.entity';
import * as campaignEntity from 'src/app/campaign/campaign.entity';
import { Store } from '@ngrx/store';
import { Participant } from 'src/app/participant/participant.interface';
import { CreateParticipantAction } from 'src/app/participant/participant.action';
import { Campaign, ICampaign } from 'src/app/campaign/campaign.interface';
import { LoadAllCampaignsAction } from 'src/app/campaign/campaign.action';

@Component({
  selector: 'hrcatalyst-participantimport',
  templateUrl: './participant.import.html',
  styleUrls: ['./participant.import.css']
})
export class ParticipantImportComponent extends FormBase implements OnDestroy, OnInit {
  files: File | FileList;

  participants: Participant[];

  associateState$: Observable<IAssociate[]>;
  associateSubscription$: Subscription;
  associates: Associate[];

  campaignsState$: Observable<ICampaign[]>;
  campaignSubscription$: Subscription;
  campaigns: Campaign[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ParticipantImportComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private participantStore: Store<participantEntity.ParticipantState>, private associateStore: Store<associateEntity.AssociateState>,
    private campaignStore: Store<campaignEntity.CampaignState>) {
    super();

    this.associateState$ = this.associateStore.select(associateEntity.selectAll);
    this.associateSubscription$ = this.associateState$.subscribe((state) => {
      this.associates = state;
    });

    this.campaignsState$ = this.campaignStore.select(campaignEntity.selectAll);
    this.campaignSubscription$ = this.campaignsState$.subscribe((state) => {
      this.campaigns = state;
    });
  }

  ngOnInit() {
    this.campaignStore.dispatch(new LoadAllCampaignsAction());
  }

  ngOnDestroy() {
    if (this.associateSubscription$ != null) {
      this.associateSubscription$.unsubscribe();
    }
    if (this.campaignSubscription$ != null) {
      this.campaignSubscription$.unsubscribe();
    }
  }

  onSave() {
    this.participants.forEach(p => {
      this.participantStore.dispatch(new CreateParticipantAction(p));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasParticipants() {
    return (this.participants != null && this.participants.length > 0);
  }

  onFileChange(event) {
    const reader = new FileReader();

    this.participants = new Array<Participant>();

    if (event.target.files && event.target.files.length) {

      // readXlsxFile(event.target.files[0], schemaImportParticipant).then((rows) => {
      //   // `rows` is an array of rows
      //   // each row being an array of cells.
      //   rows.forEach(r => {
      //       const campaign = r[enumImportParticipant.CAMPAIGN].toString();
      //       const participantEmail = r[enumImportParticipant.PARTICIPANT_EMAIL].toString();
      //       if (participantEmail !== 'participant email') {
      //         const p = new Participant();

      //         const cam = this.campaigns.find(ca => ca.name === campaign);

      //         const associate = this.associates.find(a => a.emailAddress === participantEmail);
      //         if (associate === undefined) {
      //           console.log(participantEmail);
      //         }
      //         if (cam !== undefined && associate !== undefined) {
      //           p.associateId = associate.id;
      //           p.campaignId = cam.id;
      //           this.participants.push(p);
      //         } else {
      //           console.log(r);
      //         }
      //       }
      //   });
      });
    }
  }
}

