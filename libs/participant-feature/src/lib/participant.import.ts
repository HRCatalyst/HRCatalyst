import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import readXlsxFile from 'read-excel-file';
import { Store } from '@ngrx/store';
import { FormBase, Participant, participantEntity } from '@hrc/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createParticipant } from './+state/participant.actions';

@Component({
  selector: 'hrc-participantimport',
  templateUrl: './participant.import.html',
  styleUrls: ['./participant.import.css']
})
export class ParticipantImportComponent extends FormBase {
  files?: File | FileList;

  participants?: Participant[];

  // associateState$: Observable<IAssociate[]>;
  // associateSubscription$: Subscription;
  // associates: Associate[];

  // campaignsState$: Observable<ICampaign[]>;
  // campaignSubscription$: Subscription;
  // campaigns: Campaign[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ParticipantImportComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<participantEntity.ParticipantState>) {
    super();

    // this.associateState$ = this.associateStore.select(associateEntity.selectAll);
    // this.associateSubscription$ = this.associateState$.subscribe((state) => {
    //   this.associates = state;
    // });

    // this.campaignsState$ = this.campaignStore.select(campaignEntity.selectAll);
    // this.campaignSubscription$ = this.campaignsState$.subscribe((state) => {
    //   this.campaigns = state;
    // });
  }

//   ngOnInit() {
// //    this.campaignStore.dispatch(new LoadAllCampaignsAction());
//   }

  // ngOnDestroy() {
  //   if (this.associateSubscription$ != null) {
  //     this.associateSubscription$.unsubscribe();
  //   }
  //   if (this.campaignSubscription$ != null) {
  //     this.campaignSubscription$.unsubscribe();
  //   }
  // }

  onSave() {
    this.participants?.forEach(p => {
      this.store.dispatch(createParticipant({payload: p}));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasParticipants() {
    return (this.participants != null && this.participants.length > 0);
  }

  onFileChange(event: any) {
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
      };
    }
}

