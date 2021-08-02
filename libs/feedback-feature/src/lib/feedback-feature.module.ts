import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/feedback.reducer';
import { FeedbackEffects } from './+state/feedback.effects';

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
})
export class FeedbackFeatureModule {}
