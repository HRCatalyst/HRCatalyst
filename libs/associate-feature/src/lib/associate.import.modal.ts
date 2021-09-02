import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBase } from 'src/app/shared/form.base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import readXlsxFile from 'read-excel-file';
import { schemaImportAssociate, enumImportAssociate } from './associate.import.schema';
import { Observable } from 'rxjs';
import { Associate } from 'src/app/associate/associate.interface';
import * as importEntity from 'src/app/import/import.entity';
import * as associateEntity from 'src/app/associate/associate.entity';
import { Store, select } from '@ngrx/store';
import { IImport } from 'src/app/import/import.interface';
import { LoadImportAction } from 'src/app/import/import.action';
import { CreateAssociateAction } from 'src/app/associate/associate.action';

@Component({
  selector: 'hrcatalyst-associateimport',
  templateUrl: './associate.import.modal.html',
  styleUrls: ['./associate.import.modal.css']
})
export class AssociateImportModalComponent extends FormBase implements OnInit {
  files: File | FileList;

  associates: Associate[] = null;

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<AssociateImportModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private associateStore: Store<associateEntity.AssociateState>) {
    super();

  }

  ngOnInit() {
  }

  onSave() {
    this.associates.forEach(f => {

      this.associateStore.dispatch(new CreateAssociateAction(f));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasAssociates() {
    return (this.associates != null && this.associates.length > 0);
  }

  onFileChange(event) {
    const reader = new FileReader();

    this.associates = new Array<Associate>();

    if (event.target.files && event.target.files.length) {
      readXlsxFile(event.target.files[0], schemaImportAssociate).then((rows) => {
          // `rows` is an array of rows
          // each row being an array of cells.
          rows.forEach(r => {
            const associateEmail = r[enumImportAssociate.ASSOCIATE_EMAIL].toString().toLowerCase();
            if (associateEmail !== 'associate email') {
              const a = new Associate();

              a.companyId = this.data;
              a.emailAddress = associateEmail;
              a.firstName = r[enumImportAssociate.ASSOCIATE_FIRST_NAME];
              a.lastName = r[enumImportAssociate.ASSOCIATE_LAST_NAME];
              a.title = r[enumImportAssociate.TITLE];
              a.assistant = r[enumImportAssociate.ADMIN];
              a.notes = r[enumImportAssociate.NOTES];

              this.associates.push(a);
            }
          });
      });
    }
  }
}

