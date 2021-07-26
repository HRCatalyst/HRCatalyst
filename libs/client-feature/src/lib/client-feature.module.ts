import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent
      }
    ]),
  ],
  declarations: [
    ClientComponent
  ],
  exports: [
    ClientComponent
  ],
})
export class ClientFeatureModule {}
