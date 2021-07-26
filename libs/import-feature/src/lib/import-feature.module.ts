import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportComponent } from './import/import.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ImportComponent
      }
    ]),
  ],
  declarations: [
    ImportComponent
  ],
  exports: [
    ImportComponent
  ],
})
export class ImportFeatureModule {}
