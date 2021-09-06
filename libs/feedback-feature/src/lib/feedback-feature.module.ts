import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/feedback.reducer';
import { FeedbackEffects } from './+state/feedback.effects';
import { FeedbackComponent } from './feedback.component';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeedbackComponent
      }
    ]),
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
    AngularFirestore
  ]
})
export class FeedbackFeatureModule {}
