import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/feedback.reducer';
import { FeedbackEffects } from './+state/feedback.effects';
import { FeedbackComponent } from './feedback.component';
import { Firestore } from '@angular/fire/firestore';
import { ClientFeatureModule } from '@hrcatalyst/client-feature';
import { CompanyFeatureModule } from '@hrcatalyst/company-feature';
import { ParticipantFeatureModule } from '@hrcatalyst/participant-feature';
//import { RaterFeatureModule } from '@hrcatalyst/rater-feature';
import { QuestionFeatureModule } from '@hrcatalyst/question-feature';
import { SharedFeatureModule } from '@hrcatalyst/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedbackComponent
      }
    ]),
    ClientFeatureModule,
    CompanyFeatureModule,
    ParticipantFeatureModule,
//    RaterFeatureModule,
    QuestionFeatureModule,
    SharedFeatureModule,
    StoreModule.forFeature('feedback', reducer),
    EffectsModule.forFeature([FeedbackEffects]),
  ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ],
  providers: [
    Firestore
  ]
})
export class FeedbackFeatureModule {}
