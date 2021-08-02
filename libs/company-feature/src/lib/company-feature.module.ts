import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/company.reducer';
import { CompanyEffects } from './+state/company.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent
      }
    ]),
    StoreModule.forFeature('company', reducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  declarations: [
    CompanyComponent
  ],
  exports: [
    CompanyComponent
  ],
})
export class CompanyFeatureModule {}
