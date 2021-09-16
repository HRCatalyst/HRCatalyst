import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { reducer } from './+state/associate.reducer';
import { AssociateEffects } from './+state/associate.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { AssociateComponent } from './associate.component';
import { CampaignFeatureModule } from '@hrc/campaign-feature';
import { AssociateImportModalComponent } from './associate.import.modal';
import { AssociateModalComponent } from './associate.modal';
import { FirestoreModule } from '@angular/fire/firestore';

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
    FirestoreModule,
    CampaignFeatureModule,
    StoreModule.forFeature('associate', reducer),
    EffectsModule.forFeature([AssociateEffects]),
  ],
  declarations: [
    AssociateComponent,
    AssociateImportModalComponent,
    AssociateModalComponent
  ],
  entryComponents: [
    AssociateImportModalComponent,
    AssociateModalComponent
  ],
  exports: [
    AssociateComponent,
    AssociateImportModalComponent,
    AssociateModalComponent
  ],
  providers: [
  ]
})
export class AssociateFeatureModule {}
