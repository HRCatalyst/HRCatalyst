import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AssociateComponent } from './associate/associate.component';
import { reducer } from './+state/associate.reducer';
import { AssociateEffects } from './+state/associate.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedFeatureModule } from '@hrcatalyst/shared-feature';
import { AngularFirestore } from '@angular/fire/firestore';

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
    StoreModule.forFeature('associate', reducer),
    EffectsModule.forFeature([AssociateEffects]),
  ],
  declarations: [
    AssociateComponent
  ],
  exports: [
    AssociateComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class AssociateFeatureModule {}
