import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/company.reducer';
import { CompanyEffects } from './+state/company.effects';
import { CompanyComponent } from './company.component';
import { FirestoreModule } from '@angular/fire/firestore';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { CompanyModalComponent } from './company.modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent
      }
    ]),
    FirestoreModule,
    SharedFeatureModule,
    StoreModule.forFeature('company', reducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  declarations: [
    CompanyComponent,
    CompanyModalComponent
  ],
  entryComponents: [
    CompanyModalComponent
  ],
  exports: [
    CompanyComponent
  ],
  providers: [
  ]
})
export class CompanyFeatureModule {}
