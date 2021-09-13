import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientEffects } from './+state/client.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/client.reducer';
import { Firestore } from '@angular/fire/compat/firestore';
import { ClientComponent } from './client.component';
import { SharedFeatureModule } from '@hrc/shared-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent
      }
    ]),
    SharedFeatureModule,
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature([ClientEffects]),
  ],
  declarations: [
    ClientComponent
  ],
  exports: [
    ClientComponent
  ],
  providers: [
    Firestore
  ]
})
export class ClientFeatureModule {}
