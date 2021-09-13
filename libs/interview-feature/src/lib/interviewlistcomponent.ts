import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InterviewComponent } from './interview.component';
import { Associate, ConfirmationComponent, Interview, InterviewParticipant, IUser, RELATIONSHIP_DATA } from '@hrc/shared-feature';
import { InterviewState } from './+state/interview.entity';
import { AssociateState, searchAssociates } from '@hrc/associate-feature';
import { loadInterviewParticipantsSuccess } from './+state/interview.actions';

@Component({
  selector: 'hrc-interviewlist',
  templateUrl: './interviewlist.component.html',
  styleUrls: ['./interviewlist.component.css']
})
export class InterviewListComponent implements OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject<void>();
  user$?: IUser;
  selectedAssociate?: Associate = undefined;
  participants?: InterviewParticipant[] = undefined;
  interviews?: Array<Interview>;

  participantsDefs = [
    { headerName: 'Participant First Name', field: 'first', sortable: true },
    { headerName: 'Participant Last Name', field: 'last', sortable: true },
    { headerName: 'Relationship', field: 'relationship', sortable: true, valueFormatter: v => RELATIONSHIP_DATA[v.value].name },
    { headerName: 'Interview Status', field: 'status', sortable: true },
  ];

  private gridApi? = undefined;

  constructor(private dialog: MatDialog, private store: Store<IAuth>, private interviewStore: Store<InterviewState>,
    private associateStore: Store<AssociateState>, private router: Router) {
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
    this.selectedAssociate = undefined;
    this.store.dispatch(searchAssociates({payload: ''}));
    this.store.dispatch(loadInterviewParticipantsSuccess({payload: []}));
    this.router.navigate(['/associate']);
  }

  onRefresh(id) {
    this.associateStore.dispatch(new LoadAssociateAction(id));
    this.associateStore.dispatch(new LoadInterviewParticipantsAction(id));
  }
}
