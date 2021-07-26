import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyComponent
      }
    ]),
  ],
  declarations: [
    CompanyComponent
  ],
  exports: [
    CompanyComponent
  ],
})
export class CompanyFeatureModule {}
