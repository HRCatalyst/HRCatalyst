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
import { CompanyListComponent } from './company.list';
import { ClientFeatureModule } from '@hrc/client-feature';
import { CompanyAssociateComponent } from './company-associate/company-associate.component';

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
    ClientFeatureModule,
    StoreModule.forFeature('company', reducer),
    EffectsModule.forFeature([CompanyEffects]),
  ],
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyModalComponent,
    CompanyAssociateComponent
  ],
  entryComponents: [
    CompanyModalComponent
  ],
  exports: [
    CompanyComponent,
    CompanyListComponent
  ],
  providers: [
  ]
})
export class CompanyFeatureModule {}
