import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { IAuth } from 'src/app/auth/auth.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/user/user.interface';
import * as interviewEntity from 'src/app/interview/interview.entity';
import * as associateEntity from 'src/app/associate/associate.entity';
import { Associate } from 'src/app/associate/associate.interface';
import { Participant } from 'src/app/participant/participant.interface';
import { RELATIONSHIP_DATA } from 'src/app/rater/relationship.data';
import { Router } from '@angular/router';
import { InterviewComponent } from './interview.component';
import { Interview, InterviewEdit, InterviewParticipant } from 'src/app/interview/interview.interface';
import { UpdateInterviewAction, CreateInterviewAction, LoadInterviewParticipantsAction, LoadInterviewParticipantsSuccessAction } from 'src/app/interview/interview.action';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { LoadAssociateAction, SearchAssociatesAction} from 'src/app/associate/associate.action';

@Component({
  selector: 'hrcatalyst-interviewlist',
  templateUrl: './interviewlist.component.html',
  styleUrls: ['./interviewlist.component.css']
})
export class InterviewListComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  user$: IUser;
  selectedAssociate?: Associate = null;
  participants: InterviewParticipant[] = null;
  interviews: Array<Interview>;

  participantsDefs = [
    { headerName: 'Participant First Name', field: 'first', sortable: true },
    { headerName: 'Participant Last Name', field: 'last', sortable: true },
    { headerName: 'Relationship', field: 'relationship', sortable: true, valueFormatter: v => RELATIONSHIP_DATA[v.value].name },
    { headerName: 'Interview Status', field: 'status', sortable: true },
  ];

  private gridApi;

  constructor(private dialog: MatDialog, private store: Store<IAuth>, private interviewStore: Store<interviewEntity.InterviewState>,
    private associateStore: Store<associateEntity.AssociateState>, private router: Router) {
    this.store.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.auth.settings != null) {
          this.user$ = state.auth.settings;
        }
    });

    this.associateStore.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
        if (state.associate.selectedAssociate != null) {
          this.selectedAssociate = state.associate.selectedAssociate;
        }
    });

    this.interviewStore.pipe(select((state: any) => state))
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state) => {
      if (state.interview.participants != null) {
          this.participants = state.interview.participants;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows.length > 0) {
    }
  }

  onRowDoubleClicked(row) {
    if (row.data.status === 'Submitted' || row.data.status === 'Declined') {
      return;
    }

    const iv = new InterviewEdit();

    iv.interviewer = this.user$.first_name + ' ' + this.user$.last_name;
    iv.campaignId = row.data.campaignId === undefined ? '' : row.data.campaignId;
    iv.campaignName = row.data.campaignName === undefined ? '' : row.data.campaignName;
    iv.participantId = row.data.participantId;
    iv.participantEmail = row.data.participantEmail;
    iv.participantFirst = row.data.first;
    iv.participantLast = row.data.last;
    iv.participantTitle = row.data.title;
    iv.participantNotes = row.data.notes;
    iv.raterId = row.data.associateId;
    iv.raterEmail = this.selectedAssociate.emailAddress;
    iv.raterFirst = this.selectedAssociate.firstName;
    iv.raterLast = this.selectedAssociate.lastName;
    iv.raterTitle = this.selectedAssociate.title;
    iv.raterNotes = this.selectedAssociate.notes;
    iv.relationship = RELATIONSHIP_DATA[row.data.relationship].name;
    iv.interviews = row.data.interview;

    this.openInterviewModal(iv);
  }

  openInterviewModal(feedback) {
    const dialogRef = this.dialog.open(InterviewComponent, {
      disableClose: true,
      width: '850px',
      height: '750px',
      data: feedback
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The interview dialog was closed.');
      this.interviews = result as Array<Interview>;

      if (this.interviews.length > 0) {
        const status = this.interviews[0].status;
        const message = this.getConfirmationMessage(status);

        this.openConfirmationModal('Confirm: ' + status, message, status === 'Declined' ? 'warn' : undefined);
      }
    });
  }

  getConfirmationMessage(status) {
    let message = 'Are your sure you want to mark the interview status as ';

    if (status === 'Declined') {
      message += 'Declined?';
    } else if (status === 'Submitted') {
      message += 'Submitted?';
    } else {
      message += 'Draft?';
    }
    return message;
  }

  openConfirmationModal(title, message, color) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: true,
      width: '450px',
      data: { title: title, message: message, color: color }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The confirmation dialog was closed');
      let id = '';
      this.interviews.forEach(i => {
        id = i.raterId;
        if ( i instanceof Interview) {
          i.status = result === true ? i.status : 'Draft';
          if (i.id !== undefined) {
            this.interviewStore.dispatch(new UpdateInterviewAction(i));
          } else {
            this.interviewStore.dispatch(new CreateInterviewAction(i));
          }
        }
      });
      this.onRefresh(id);
    });
  }

  onBackClicked() {
    this.selectedAssociate = null;
    this.store.dispatch(new SearchAssociatesAction(''));
    this.store.dispatch(new LoadInterviewParticipantsSuccessAction([]));
    this.router.navigate(['/associate']);
  }

  onRefresh(id) {
    this.associateStore.dispatch(new LoadAssociateAction(id));
    this.associateStore.dispatch(new LoadInterviewParticipantsAction(id));
  }
}
