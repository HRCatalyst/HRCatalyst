import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/campaign.reducer';
import { CampaignEffects } from './+state/campaign.effects';
import { CampaignComponent } from './campaign.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyFeatureModule } from '@hrcatalyst/company-feature';
import { ClientFeatureModule } from '@hrcatalyst/client-feature';
import { FeedbackFeatureModule } from '@hrcatalyst/feedback-feature';
import { ImportFeatureModule } from '@hrcatalyst/import-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CampaignComponent
      }
    ]),
    CompanyFeatureModule,
    ClientFeatureModule,
    FeedbackFeatureModule,
    ImportFeatureModule,
    StoreModule.forFeature('campaign', reducer),
    EffectsModule.forFeature([CampaignEffects]),
  ],
  declarations: [
    CampaignComponent
  ],
  exports: [
    CampaignComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class CampaignFeatureModule {}
