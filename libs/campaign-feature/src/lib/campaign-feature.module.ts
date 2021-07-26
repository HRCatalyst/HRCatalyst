import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign/campaign.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CampaignComponent
      }
    ]),
  ],
  declarations: [
    CampaignComponent
  ],
  exports: [
    CampaignComponent
  ],
})
export class CampaignFeatureModule {}
