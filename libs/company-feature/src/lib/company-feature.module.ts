import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/company.reducer';
import { CompanyEffects } from './+state/company.effects';
import { CompanyComponent } from './company.component';
import { Firestore } from '@angular/fire/compat/firestore';
import { SharedFeatureModule } from '@hrc/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent
      }
    ]),
    SharedFeatureModule,
    StoreModule.forFeature('company', reducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  declarations: [
    CompanyComponent
  ],
  exports: [
    CompanyComponent
  ],
  providers: [
    Firestore
  ]
})
export class CompanyFeatureModule {}
