import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticipantComponent } from './participant/participant.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/participant.reducer';
import { ParticipantEffects } from './+state/participant.effects';

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
})
export class ParticipantFeatureModule {}
