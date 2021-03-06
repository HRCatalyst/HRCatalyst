import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeComponent } from './home.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { ImportFeatureModule } from '@hrc/import-feature';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { QuestionFeatureModule } from '@hrc/question-feature';
import { CompanyFeatureModule } from '@hrc/company-feature';
import { CampaignFeatureModule } from '@hrc/campaign-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    FirestoreModule,
    ImportFeatureModule,
    QuestionFeatureModule,
    CompanyFeatureModule,
    CampaignFeatureModule,
    SharedFeatureModule,
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
  ]
})
export class HomeFeatureModule {}
