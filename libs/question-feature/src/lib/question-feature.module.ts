import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/question.reducer';
import { QuestionEffects } from './+state/question.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionComponent
      }
    ]),
    StoreModule.forFeature('question', reducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  declarations: [
    QuestionComponent
  ],
  exports: [
    QuestionComponent
  ],
})
export class QuestionFeatureModule {}
