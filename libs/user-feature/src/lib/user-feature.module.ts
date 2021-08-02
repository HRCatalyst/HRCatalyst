import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { reducer } from './+state/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ]),
    StoreModule.forFeature('user', reducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
})
export class UserFeatureModule {}
