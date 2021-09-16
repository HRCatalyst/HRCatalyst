import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/feedback.reducer';
import { FeedbackEffects } from './+state/feedback.effects';
import { FeedbackComponent } from './feedback.component';
import { ClientFeatureModule } from '@hrc/client-feature';
import { CompanyFeatureModule } from '@hrc/company-feature';
import { ParticipantFeatureModule } from '@hrc/participant-feature';
import { QuestionFeatureModule } from '@hrc/question-feature';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { FirestoreModule } from '@angular/fire/firestore';
import { FeedbackModalComponent } from './feedback.modal';
import { FeedbackErrorsModalComponent } from './feedbackerrors.modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedbackComponent
      }
    ]),
    FirestoreModule,
    SharedFeatureModule,
    ClientFeatureModule,
    CompanyFeatureModule,
    ParticipantFeatureModule,
//    RaterFeatureModule,
    QuestionFeatureModule,
    StoreModule.forFeature('feedback', reducer),
    EffectsModule.forFeature([FeedbackEffects]),
  ],
  declarations: [
    FeedbackComponent,
    FeedbackModalComponent,
    FeedbackErrorsModalComponent
  ],
  entryComponents: [
    FeedbackModalComponent,
    FeedbackErrorsModalComponent
  ],
  exports: [
    FeedbackComponent
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FeedbackFeatureModule {}
