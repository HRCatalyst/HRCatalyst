import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/participant.reducer';
import { ParticipantEffects } from './+state/participant.effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParticipantComponent } from './participant.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipantComponent
      }
    ]),
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
    AngularFirestore
  ]
})
export class ParticipantFeatureModule {}
