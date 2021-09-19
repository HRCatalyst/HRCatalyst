import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/campaign.reducer';
import { CampaignEffects } from './+state/campaign.effects';
import { CampaignComponent } from './campaign.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { CompanyFeatureModule } from '@hrc/company-feature';
import { ClientFeatureModule } from '@hrc/client-feature';
import { FeedbackFeatureModule } from '@hrc/feedback-feature';
import { ImportFeatureModule } from '@hrc/import-feature';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { CampaignModalComponent } from './campaign.modal';
import { CampaignYearModalComponent } from './campaign.year.modal';
import { CampaignYearComponent } from './campaign.year.component';

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
    SharedFeatureModule,
    FirestoreModule,
    StoreModule.forFeature('campaign', reducer),
    EffectsModule.forFeature([CampaignEffects]),
  ],
  declarations: [
    CampaignComponent,
    CampaignModalComponent,
    CampaignYearComponent,
    CampaignYearModalComponent
  ],
  entryComponents: [
    CampaignModalComponent,
    CampaignYearModalComponent
  ],
  exports: [
    CampaignComponent,
    CampaignYearComponent
  ],
  providers: [
  ]
})
export class CampaignFeatureModule {}
