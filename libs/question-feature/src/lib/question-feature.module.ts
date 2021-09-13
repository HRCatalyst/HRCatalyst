import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/question.reducer';
import { QuestionEffects } from './+state/question.effects';
import { QuestionComponent } from './question.component';
import { Firestore } from '@angular/fire/compat/firestore';
import { SharedFeatureModule } from '@hrc/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionComponent
      }
    ]),
    SharedFeatureModule,
    StoreModule.forFeature('question', reducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  declarations: [
    QuestionComponent
  ],
  exports: [
    QuestionComponent
  ],
  providers: [
    Firestore
  ]
})
export class QuestionFeatureModule {}
