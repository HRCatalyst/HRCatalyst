import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionComponent
      }
    ]),
  ],
  declarations: [
    QuestionComponent
  ],
  exports: [
    QuestionComponent
  ],
})
export class QuestionFeatureModule {}
