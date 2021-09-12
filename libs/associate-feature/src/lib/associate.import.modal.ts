import { Component, Inject } from '@angular/core';
import { Associate, FormBase } from '@hrcatalyst/shared-feature';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store} from '@ngrx/store';
import { createAssociate } from './+state/associate.actions';
import { AssociateState } from './+state/associate.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import readXlsxFile from 'read-excel-file'; //'read-excel-file';

@Component({
  selector: 'hrcatalyst-associateimport',
  templateUrl: './associate.import.modal.html',
  styleUrls: ['./associate.import.modal.css']
})
export class AssociateImportModalComponent extends FormBase {
  files?: File | FileList;

  associates?: Associate[] = undefined;

  form = new FormGroup({
      'file': new FormControl([null, Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<AssociateImportModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private associateStore: Store<AssociateState>) {
    super();

  }

  onSave() {
    this.associates?.forEach(f => {

      this.associateStore?.dispatch(createAssociate({payload: f}));
    });

    this.dialogRef.close('import');
  }

  onSubmit() {
    this.onSave();
  }

  hasAssociates() {
    return (this.associates != null && this.associates.length > 0);
  }

  onFileChange(event: any) {
      this.associates = new Array<Associate>();

    // if (event.target.files && event.target.files.length) {
    //   readXlsxFile(event.target.files[0], schemaImportAssociate).then((rows) => {
    //       // `rows` is an array of rows
    //       // each row being an array of cells.
    //       rows.forEach(r => {
    //         const associateEmail = r[enumImportAssociate.ASSOCIATE_EMAIL].toString().toLowerCase();
    //         if (associateEmail !== 'associate email') {
    //           const a = new Associate();

    //           a.companyId = this.data;
    //           a.emailAddress = associateEmail;
    //           a.firstName = r[enumImportAssociate.ASSOCIATE_FIRST_NAME];
    //           a.lastName = r[enumImportAssociate.ASSOCIATE_LAST_NAME];
    //           a.title = r[enumImportAssociate.TITLE];
    //           a.assistant = r[enumImportAssociate.ADMIN];
    //           a.notes = r[enumImportAssociate.NOTES];

    //           this.associates?.push(a);
    //         }
    //       });
    //   });
    }
}

