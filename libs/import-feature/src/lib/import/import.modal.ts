import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import readXlsxFile from 'read-excel-file';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Associate, Campaign, enumFeedbackStatus, enumRationship, Feedback, FEEDBACK_STATUS, FormBase, Import, Participant, Rater, RELATIONSHIP_DATA,
  importEntity } from '@hrc/shared-feature';
import { createRater } from '@hrc/rater-feature';
//import { createParticipant } from '@hrc/participant-feature';
import { loadImport, logImportError } from '../+state/import.actions';
//import { createFeedback} from '@hrc/feedback-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'hrc-import',
  templateUrl: './import.modal.html',
  styleUrls: ['./import.modal.css']
})
export class ImportModalComponent extends FormBase implements OnDestroy, OnInit {
  files?: File | FileList;

  feedback?: Array<Feedback>;
  private onDestroy$: Subject<void> = new Subject<void>();

  // importState$: Observable<IImport[]>;
  // importSubscription$: Subscription;
  associates?: Associate[];
  participants?: Participant[];
  campaigns?: Campaign[];
  raters?: Rater[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ImportModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<importEntity.ImportState>) {
    super();

    // this.importState$ = this.importStore.select(importEntity.selectAll);
    // this.importSubscription$ = this.importStore.pipe(select((state: any) => state)).subscribe((state) => {
    //   if (state.import.associates != null) {
    //       this.associates = state.import.associates;
    //   }

    //   if (state.import.participants != null) {
    //       this.participants = state.import.participants;
    //   }

    //   if (state.import.campaigns != null) {
    //       this.campaigns = state.import.campaigns;
    //   }

    //   if (state.import.raters != null) {
    //       this.raters = state.import.raters;
    //   }
    // });
  }

  ngOnInit() {
    this.store.dispatch(loadImport());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  onSave() {
    this.feedback?.map(f => {
      const rater = this.associates?.filter(r => r.emailAddress.toLowerCase() === f.raterEmail.toLowerCase());
      const participant = this.associates?.filter(p => p.emailAddress.toLowerCase() === f.participantEmail.toLowerCase());

      if (rater !== undefined && rater.length > 0) {
        f.raterId = rater[0].id;
        f.raterFirst = rater[0].firstName;
        f.raterLast = rater[0].lastName;
      } else {
        this.logImportMessage('Error', 'Rater ' + f.raterEmail.toLowerCase() + ' could not be found!');
      }

      f.relationship = RELATIONSHIP_DATA[enumRationship.COLLEAGUE].name;
      if (participant !== undefined && participant.length > 0 && rater !== undefined && rater.length > 0) {
        const relate = this.raters?.filter(x => x.associateId === rater[0].id && x.participantId === participant[0].id);
        if (relate !== undefined && relate.length > 0) {
          const item = RELATIONSHIP_DATA.filter(y => y.id === relate[0].relationship);
          f.relationship = item.length > 0 ? item[0].name : RELATIONSHIP_DATA[enumRationship.COLLEAGUE].name;
        }
      }

      if (participant !== undefined && participant.length > 0) {
        f.participantId = participant[0].id;
        f.participantFirst = participant[0].firstName;
        f.participantLast = participant[0].lastName;

        const associate = this.participants?.filter(a => a.associateId === f.participantId);
        if (associate !== undefined && associate.length > 0) {
            f.campaignId = associate[0].campaignId;

            const campaign = this.campaigns?.filter(c => c.id === f.campaignId);
            if (campaign !== undefined && campaign.length > 0) {
              f.campaignName = campaign[0].name;
            }
        }
      } else {
        this.logImportMessage('Error', 'Participant ' + f.participantEmail.toLowerCase() + ' could not be found!');
      }

      f.dateCreated = new Date().toLocaleString();
      f.status = FEEDBACK_STATUS[enumFeedbackStatus.RECEIVED].name;

      console.log(`FEEDBACK: ${JSON.stringify(f)}`);
//      this.feedbackStore.dispatch(createFeedback({payload: f}));
    });
    this.logImportMessage('Info', 'Import of ' + this.feedback?.length.toLocaleString() + ' records at ' + new Date().toLocaleString());
    this.dialogRef.close('import');
  }

  logImportMessage(event: any, content: any) {
    const i = new Import();
    i.importType = 'Feedback';
    i.eventType = event;
    i.eventDate = new Date();
    i.content = content;
    i.status = 'Open';

//    this.store.dispatch(logImportError({payload: i}));
    console.log(`FEEDBACK: ${JSON.stringify(content)}`);
  }

  addParticipants() {
    const campaign = this.campaigns !== undefined && this.campaigns.length > 0 ? this.campaigns[0] : null;

    const partIds = this.participants !== undefined && this.participants.length > 0 ? this.participants?.map(p => p.associateId) : [];

    const assocIds = this.associates?.filter(a => !partIds?.includes(a.id ?? ''));

    assocIds?.forEach(x => {
      const p = new Participant();
      p.campaignId = campaign?.id ?? '';
      p.associateId = x.id ?? '';
//      this.store.dispatch(createParticipant({payload: p}));
    });
  }

  addRaters() {
    const assocIds = this.associates?.map(a => a.id);

    assocIds?.forEach(a => {
      // skip
      const skipIds = this.raters?.filter(r => r.participantId === a).map(e => e.associateId);

      // skip yourself
      skipIds?.push(a ?? '');

      const addIds = this.associates?.filter(n => !skipIds?.includes(n.id ?? '')).map(i => i.id);

      addIds?.forEach(r => {
        const rater = new Rater();
        rater.participantId = a ?? '';
        rater.associateId = r ?? '';
        rater.relationship = enumRationship.PEER;

        this.store.dispatch(createRater({payload: rater}));
        console.log(JSON.stringify(rater));
      });
    });
  }

  hasRaters() {
    return this.associates !== null && this.campaigns !== null && this.raters !== null;
  }

  onSubmit() {
    this.onSave();
  }

  hasFeedback() {
    return (this.feedback != null && this.feedback.length > 0);
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    this.feedback = new Array<Feedback>();

    if (event.target.files && event.target.files.length) {
      const name = event.target.files[0].name;
      this.logImportMessage('Info', 'Begin import of ' + name + ' at ' + new Date().toLocaleString());
      // readXlsxFile(event.target.files[0], schemaImportFeedback).then((rows) => {
      //   // `rows` is an array of rows
      //   // each row being an array of cells.
      //   rows.forEach(r => {
      //     const raterEmail = r[enumImportFeedback.RATER_EMAIL].toString().toLowerCase();
      //     const participantEmail = r[enumImportFeedback.PARTICIPANT_EMAIL].toString().toLowerCase();
      //     if (raterEmail !== 'rater email' && participantEmail !== 'participant email') {
      //       const fb = new Feedback();
      //       fb.raterEmail = r[enumImportFeedback.RATER_EMAIL].toLowerCase();
      //       fb.participantEmail = r[enumImportFeedback.PARTICIPANT_EMAIL].toLowerCase();
      //       fb.dateReceived = r[enumImportFeedback.DATE_RECEIVED];
      //       fb.question = r[enumImportFeedback.QUESTION_ID];
      //       fb.answer = r[enumImportFeedback.FEEDBACK];

      //       console.log(`RATER: ${JSON.stringify(fb)}`);
      //       this.feedback.push(fb);
      //     }
      //   });
      //   this.logImportMessage('Info', this.feedback.length.toLocaleString() + ' records loaded from ' + name);
      // });
    }
  }
}

