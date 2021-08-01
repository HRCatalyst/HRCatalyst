import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/campaign.reducer';
import { CampaignEffects } from './+state/campaign.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CampaignComponent
      }
    ]),
    StoreModule.forFeature('campaign', reducer),
    EffectsModule.forFeature([CampaignEffects]),
  ],
  declarations: [
    CampaignComponent
  ],
  exports: [
    CampaignComponent
  ],
})
export class CampaignFeatureModule {}
