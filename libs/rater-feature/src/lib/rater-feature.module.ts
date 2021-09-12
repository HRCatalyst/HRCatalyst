import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/rater.reducer';
import { RaterEffects } from './+state/rater.effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { RaterComponent } from './rater.component';

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
    EffectsModule.forFeature([RaterEffects])
  ],
  declarations: [
    RaterComponent
  ],
  exports: [
    RaterComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class RaterFeatureModule {}
