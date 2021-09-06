import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/question.reducer';
import { QuestionEffects } from './+state/question.effects';
import { QuestionComponent } from './question.component';
import { AngularFirestore } from '@angular/fire/firestore';

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
  providers: [
    AngularFirestore
  ]
})
export class QuestionFeatureModule {}
