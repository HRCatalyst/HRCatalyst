import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientEffects } from './+state/client.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/client.reducer';
import { ClientComponent } from './client.component';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { ClientModalComponent } from './client.modal';
import { FirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientComponent
      }
    ]),
    FirestoreModule,
    SharedFeatureModule,
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature([ClientEffects]),
  ],
  declarations: [
    ClientComponent,
    ClientModalComponent
  ],
  entryComponents: [
    ClientModalComponent
  ],
  exports: [
    ClientComponent
  ],
  providers: [
  ]
})
export class ClientFeatureModule {}
