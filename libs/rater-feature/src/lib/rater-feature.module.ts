import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/rater.reducer';
import { RaterEffects } from './+state/rater.effects';
import { Firestore } from '@angular/fire/firestore';
import { RaterComponent } from './rater.component';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { RaterModalComponent } from './rater.modal';
import { RaterImportComponent } from './rater.import';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RaterComponent
      }
    ]),
    SharedFeatureModule,
    StoreModule.forFeature('rater', reducer),
    EffectsModule.forFeature([RaterEffects])
  ],
  declarations: [
    RaterComponent,
    RaterImportComponent,
    RaterModalComponent
  ],
  entryComponents: [
    RaterModalComponent,
    RaterImportComponent
  ],
  exports: [
    RaterComponent,
    RaterImportComponent,
    RaterModalComponent
  ],
  providers: [
    Firestore
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RaterFeatureModule {}
