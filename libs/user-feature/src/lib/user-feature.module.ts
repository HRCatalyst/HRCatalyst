import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { reducer } from './+state/user.reducer';
import { UserComponent } from './user.component';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { FirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ]),
    FirestoreModule,
    SharedFeatureModule,
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [
  ]
})
export class UserFeatureModule {}
