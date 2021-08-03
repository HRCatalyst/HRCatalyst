import { FormGroup } from '@angular/forms';

export class FormBase {
    form?: FormGroup;

    isFieldValid(field: string) {
      return !this.form?.get(field)?.valid && this.form?.get(field)?.touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }
}
