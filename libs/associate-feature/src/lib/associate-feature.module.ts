import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { reducer } from './+state/associate.reducer';
import { AssociateEffects } from './+state/associate.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedFeatureModule } from '@hrcatalyst/shared-feature';
import { AuthFeatureModule } from '@hrcatalyst/auth-feature';
import { Firestore } from '@angular/fire/firestore';
import { AssociateComponent } from './associate.component';
import { CampaignFeatureModule } from '@hrcatalyst/campaign-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AssociateComponent
      }
    ]),
    SharedFeatureModule,
    AuthFeatureModule,
    CampaignFeatureModule,
    StoreModule.forFeature('associate', reducer),
    EffectsModule.forFeature([AssociateEffects]),
  ],
  declarations: [
    AssociateComponent
  ],
  exports: [
    AssociateComponent
  ],
  providers: [
    Firestore
  ]
})
export class AssociateFeatureModule {}
