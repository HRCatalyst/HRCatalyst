import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import readXlsxFile from 'read-excel-file';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Associate, Company, FormBase, IAssociate, Rater } from '@hrc/shared-feature';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RaterState } from './+state/rater.entity';
import { CompanyState } from '@hrc/company-feature';
import { createRater } from './+state/rater.actions';


@Component({
  selector: 'hrc-raterimport',
  templateUrl: './rater.import.html',
  styleUrls: ['./rater.import.css']
})
export class RaterImportComponent extends FormBase implements OnDestroy {
  files?: File | FileList;

  raters?: Rater[];

  selectedCompany?: Company;
  associateState$?: Observable<IAssociate[]>;
  associateSubscription?: Subscription;
  companySubscription?: Subscription;
  associates?: Associate[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<RaterImportComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private raterStore: Store<RaterState>, private companyStore: Store<CompanyState>) {
    super();

    // this.associateState$ = this.associateStore.select(associateEntity.selectAll);
    // this.associateSubscription = this.associateState$.subscribe((state) => {
    //     this.associates = state;
    // });

    // this.companySubscription = this.companyStore.pipe(select((state: any) => state)).subscribe((state) => {
    //   if (state.company.selectedCompany != null && this.selectedCompany == null) {
    //     this.selectedCompany = state.company.selectedCompany;
    //     this.associateStore.dispatch(new LoadCompanyAssociatesAction(state.company.selectedCompany.id));
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.associateSubscription != null) {
      this.associateSubscription.unsubscribe();
    }
    if (this.companySubscription != null) {
      this.companySubscription.unsubscribe();
    }
  }

  onSave() {
    this.raters?.map(p => {
     this.raterStore.dispatch(createRater({payload: p}));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasRaters() {
    return (this.raters != null && this.raters.length > 0);
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    this.raters = new Array<Rater>();

    if (event.target.files && event.target.files.length) {

      // readXlsxFile(event.target.files[0], schemaImportRater).then((rows) => {
      //   // `rows` is an array of rows
      //   // each row being an array of cells.
      //   rows.forEach(r => {
      //       const participantEmail = r[enumImportRater.PARTICIPANT_EMAIL].toString().toLowerCase();
      //       const respondentEmail = r[enumImportRater.RESPONDENT_EMAIL].toString().toLowerCase();
      //       const relationship = r[enumImportRater.RELATIONSHIP].toString().toLowerCase();
      //       if (participantEmail !== 'participant email') {
      //         const p = new Rater();

      //         const participant = this.associates.filter(a => a.emailAddress.toLocaleLowerCase() === participantEmail);
      //         const rater = this.associates.filter(x => x.emailAddress.toLocaleLowerCase() === respondentEmail);
      //         const relate = RELATIONSHIP_DATA.filter(y => y.name.toLocaleLowerCase() === relationship);

      //         if (participant.length > 0 && rater.length > 0 && relate.length > 0) {
      //           p.participantId = participant[0].id;
      //           p.associateId = rater[0].id;
      //           p.relationship = relate[0].id;

      //           this.raters.push(p);
      //         } else {
      //           console.log(r);
      //         }
      //       }
      //   });

      // });
    }
  }
}

