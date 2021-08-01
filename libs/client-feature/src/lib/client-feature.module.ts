import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientEffects } from './+state/client.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/client.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent
      }
    ]),
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature([ClientEffects]),
  ],
  declarations: [
    ClientComponent
  ],
  exports: [
    ClientComponent
  ],
})
export class ClientFeatureModule {}
