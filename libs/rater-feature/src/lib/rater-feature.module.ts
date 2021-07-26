import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaterComponent } from './rater/rater.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RaterComponent
      }
    ]),
  ],
  declarations: [
    RaterComponent
  ],
  exports: [
    RaterComponent
  ],
})
export class RaterFeatureModule {}
