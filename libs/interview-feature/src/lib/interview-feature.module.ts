import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/interview.reducer';
import { InterviewEffects } from './+state/interview.effects';
import { FirestoreModule } from '@angular/fire/firestore';
import { InterviewComponent } from './interview.component';
import { FeedbackFeatureModule } from '@hrc/feedback-feature';
import { QuestionFeatureModule } from '@hrc/question-feature';
import { SharedFeatureModule } from '@hrc/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterviewComponent
      }
    ]),
    FirestoreModule,
    FeedbackFeatureModule,
    QuestionFeatureModule,
    SharedFeatureModule,
    StoreModule.forFeature('interview', reducer),
    EffectsModule.forFeature([InterviewEffects]),
  ],
  declarations: [
    InterviewComponent
  ],
  entryComponents: [
    InterviewComponent
  ],
  exports: [
    InterviewComponent
  ],
  providers: [
  ]
})
export class InterviewFeatureModule {}
