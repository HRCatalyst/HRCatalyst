import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/import.reducer';
import { ImportEffects } from './+state/import.effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImportModalComponent } from './import/import.modal';
import { FeedbackFeatureModule } from '@hrcatalyst/feedback-feature';
import { RaterFeatureModule } from '@hrcatalyst/rater-feature';
import { ParticipantFeatureModule } from '@hrcatalyst/participant-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ImportComponent
      }
    ]),
    FeedbackFeatureModule,
    RaterFeatureModule,
    ParticipantFeatureModule,
    StoreModule.forFeature('import', reducer),
    EffectsModule.forFeature([ImportEffects]),
  ],
  declarations: [
    ImportComponent,
    ImportModalComponent
  ],
  exports: [
    ImportComponent,
    ImportModalComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class ImportFeatureModule {}
