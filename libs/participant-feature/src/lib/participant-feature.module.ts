import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/participant.reducer';
import { ParticipantEffects } from './+state/participant.effects';
import { FirestoreModule } from '@angular/fire/firestore';
import { ParticipantComponent } from './participant.component';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { ParticipantImportComponent } from './participant.import';
import { ParticipantModalComponent } from './participant.modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipantComponent
      }
    ]),
    FirestoreModule,
    SharedFeatureModule,
    StoreModule.forFeature('participant', reducer),
    EffectsModule.forFeature([ParticipantEffects]),
  ],
  declarations: [
    ParticipantComponent,
    ParticipantModalComponent,
    ParticipantImportComponent
  ],
  entryComponents: [
    ParticipantImportComponent,
    ParticipantModalComponent
  ],
  exports: [
    ParticipantComponent,
    ParticipantImportComponent
  ],
  providers: [
  ]
})
export class ParticipantFeatureModule {}
