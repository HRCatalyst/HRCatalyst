import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBase } from 'src/app/shared/form.base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import readXlsxFile from 'read-excel-file';
import { schemaExportFeedback, enumExportFeedback } from './export.schema';
import { Feedback } from 'src/app/feedback/feedback.interface';
import { Observable } from 'rxjs';
import { Associate } from 'src/app/associate/associate.interface';
import * as participantEntity from 'src/app/participant/participant.entity';
import * as importEntity from 'src/app/import/import.entity';
import * as feedbackEntity from 'src/app/feedback/feedback.entity';
import * as raterEntity from 'src/app/rater/rater.entity';
import { Store, select } from '@ngrx/store';
import { Participant } from 'src/app/participant/participant.interface';
import { Campaign } from 'src/app/campaign/campaign.interface';
import { IImport } from 'src/app/import/import.interface';
import { LoadImportAction } from 'src/app/import/import.action';
import { enumFeedbackStatus, FEEDBACK_STATUS } from 'src/app/feedback/feedback.data';
import { Rater } from 'src/app/rater/rater.interface';

@Component({
  selector: 'hrcatalyst-export',
  templateUrl: './export.modal.html',
  styleUrls: ['./export.modal.css']
})
export class ExportModalComponent extends FormBase implements OnInit {
  files: File | FileList;

  feedback: Feedback[] = null;

  importState$: Observable<IImport[]>;
  associates: Associate[];
  participants: Participant[];
  campaigns: Campaign[];
  raters: Rater[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ExportModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    super();

    // this.importState$ = this.importStore.select(importEntity.selectAll);

    // this.importStore.pipe(select((state: any) => state)).subscribe((state) => {
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
    // this.importStore.dispatch(new LoadImportAction());
  }

  onSave() {
    // this.feedback.map(f => {
    //   const rater = this.associates.filter(r => r.emailAddress.toLowerCase() === f.raterEmail.toLowerCase());
    //   const participant = this.associates.filter(p => p.emailAddress.toLowerCase() === f.participantEmail.toLowerCase());

    //   if (rater.length > 0) {
    //     f.raterId = rater[0].id;
    //     f.raterFirst = rater[0].firstName;
    //     f.raterLast = rater[0].lastName;
    //   } else {
    //     console.log('Rater ' + f.raterEmail.toLowerCase() + ' could not be found!');
    //   }



    //   if (participant.length > 0) {
    //     f.participantId = participant[0].id;
    //     f.participantFirst = participant[0].firstName;
    //     f.participantLast = participant[0].lastName;

    //     const associate = this.participants.filter(a => a.associateId === f.participantId);
    //     if (associate.length > 0) {
    //         f.campaignId = associate[0].campaignId;

    //         const campaign = this.campaigns.filter(c => c.id === f.campaignId);
    //         if (campaign.length > 0) {
    //           f.campaignName = campaign[0].name;
    //         }
    //     }
    //   } else {
    //     console.log('Participant ' + f.participantEmail.toLowerCase() + ' could not be found!');
    //   }
    //   f.dateCreated = new Date().toLocaleString();
    //   f.status = FEEDBACK_STATUS[enumFeedbackStatus.PENDING].name;

    //   this.feedbackStore.dispatch(new CreateFeedbackAction(f));
    // });

    this.dialogRef.close('export');
  }

  onSubmit() {
    this.onSave();
  }

  hasFeedback() {
    return (this.feedback != null && this.feedback.length > 0);
  }

  onFileChange(event) {
    const reader = new FileReader();

    this.feedback = new Array<Feedback>();

    // if (event.target.files && event.target.files.length) {

    //   readXlsxFile(event.target.files[0], schemaImportFeedback).then((rows) => {
    //     // `rows` is an array of rows
    //     // each row being an array of cells.
    //     rows.forEach(r => {
    //       const raterEmail = r[enumImportFeedback.RATER_EMAIL].toString().toLowerCase();
    //       const participantEmail = r[enumImportFeedback.PARTICIPANT_EMAIL].toString().toLowerCase();
    //       if (raterEmail !== 'rater email' && participantEmail !== 'participant email') {
    //         const fb = new Feedback();
    //         fb.raterEmail = r[enumImportFeedback.RATER_EMAIL].toLowerCase();
    //         fb.participantEmail = r[enumImportFeedback.PARTICIPANT_EMAIL].toLowerCase();
    //         fb.dateReceived = r[enumImportFeedback.DATE_RECEIVED];
    //         fb.question = r[enumImportFeedback.QUESTION_ID];
    //         fb.answer = r[enumImportFeedback.FEEDBACK];

    //         this.feedback.push(fb);
    //       }
    //     });

    //   });
    // }
  }
}

