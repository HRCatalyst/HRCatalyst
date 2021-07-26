import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent
      }
    ]),
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
})
export class UserFeatureModule {}
