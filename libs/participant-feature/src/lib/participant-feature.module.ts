import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/participant.reducer';
import { ParticipantEffects } from './+state/participant.effects';
import { Firestore } from '@angular/fire/compat/firestore';
import { ParticipantComponent } from './participant.component';
import { SharedFeatureModule } from '@hrc/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipantComponent
      }
    ]),
    SharedFeatureModule,
    StoreModule.forFeature('participant', reducer),
    EffectsModule.forFeature([ParticipantEffects]),
  ],
  declarations: [
    ParticipantComponent
  ],
  exports: [
    ParticipantComponent
  ],
  providers: [
    Firestore
  ]
})
export class ParticipantFeatureModule {}
