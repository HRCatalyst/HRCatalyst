import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssociateComponent } from './associate/associate.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AssociateComponent
      }
    ]),
  ],
  declarations: [
    AssociateComponent
  ],
  exports: [
    AssociateComponent
  ],
})
export class AssociateFeatureModule {}
