import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InterviewComponent } from './interview/interview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterviewComponent
      }
    ]),
  ],
  declarations: [
    InterviewComponent
  ],
  exports: [
    InterviewComponent
  ],
})
export class InterviewFeatureModule {}
