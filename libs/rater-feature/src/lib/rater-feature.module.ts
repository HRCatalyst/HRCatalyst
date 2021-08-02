import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RaterComponent } from './rater/rater.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/rater.reducer';
import { RaterEffects } from './+state/rater.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RaterComponent
      }
    ]),
    StoreModule.forFeature('rater', reducer),
    EffectsModule.forFeature([RaterEffects]),
  ],
  declarations: [
    RaterComponent
  ],
  exports: [
    RaterComponent
  ],
})
export class RaterFeatureModule {}
