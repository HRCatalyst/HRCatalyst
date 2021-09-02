import { Component, OnInit, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBase } from 'src/app/shared/form.base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import readXlsxFile from 'read-excel-file';
import { schemaImportRater, enumImportRater } from './rater.schema';
import { Observable, Subscription } from 'rxjs';
import { Associate, IAssociate } from 'src/app/associate/associate.interface';
import * as companyEntity from 'src/app/company/company.entity';
import * as raterEntity from 'src/app/rater/rater.entity';
import * as associateEntity from 'src/app/associate/associate.entity';
import { Store, select } from '@ngrx/store';
import { Rater } from 'src/app/rater/rater.interface';
import { CreateRaterAction } from 'src/app/rater/rater.action';
import { Company } from 'src/app/company/company.interface';
import { LoadCompanyAssociatesAction } from 'src/app/associate/associate.action';
import { RELATIONSHIP_DATA } from 'src/app/rater/relationship.data';

@Component({
  selector: 'hrcatalyst-raterimport',
  templateUrl: './rater.import.html',
  styleUrls: ['./rater.import.css']
})
export class RaterImportComponent extends FormBase implements OnDestroy, OnInit {
  files: File | FileList;

  raters: Rater[];

  selectedCompany: Company;
  associateState$: Observable<IAssociate[]>;
  associateSubscription: Subscription;
  companySubscription: Subscription;
  associates: Associate[];

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<RaterImportComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private raterStore: Store<raterEntity.RaterState>, private associateStore: Store<associateEntity.AssociateState>,
    private companyStore: Store<companyEntity.CompanyState>) {
    super();

    this.associateState$ = this.associateStore.select(associateEntity.selectAll);
    this.associateSubscription = this.associateState$.subscribe((state) => {
        this.associates = state;
    });

    this.companySubscription = this.companyStore.pipe(select((state: any) => state)).subscribe((state) => {
      if (state.company.selectedCompany != null && this.selectedCompany == null) {
        this.selectedCompany = state.company.selectedCompany;
        this.associateStore.dispatch(new LoadCompanyAssociatesAction(state.company.selectedCompany.id));
      }
    });
  }

  ngOnInit() {
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
    this.raters.map(p => {
     this.raterStore.dispatch(new CreateRaterAction(p));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasRaters() {
    return (this.raters != null && this.raters.length > 0);
  }

  onFileChange(event) {
    const reader = new FileReader();

    this.raters = new Array<Rater>();

    if (event.target.files && event.target.files.length) {

      readXlsxFile(event.target.files[0], schemaImportRater).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        rows.forEach(r => {
            const participantEmail = r[enumImportRater.PARTICIPANT_EMAIL].toString().toLowerCase();
            const respondentEmail = r[enumImportRater.RESPONDENT_EMAIL].toString().toLowerCase();
            const relationship = r[enumImportRater.RELATIONSHIP].toString().toLowerCase();
            if (participantEmail !== 'participant email') {
              const p = new Rater();

              const participant = this.associates.filter(a => a.emailAddress.toLocaleLowerCase() === participantEmail);
              const rater = this.associates.filter(x => x.emailAddress.toLocaleLowerCase() === respondentEmail);
              const relate = RELATIONSHIP_DATA.filter(y => y.name.toLocaleLowerCase() === relationship);

              if (participant.length > 0 && rater.length > 0 && relate.length > 0) {
                p.participantId = participant[0].id;
                p.associateId = rater[0].id;
                p.relationship = relate[0].id;

                this.raters.push(p);
              } else {
                console.log(r);
              }
            }
        });

      });
    }
  }
}

