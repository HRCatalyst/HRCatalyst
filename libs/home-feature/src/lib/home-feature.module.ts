import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
})
export class HomeFeatureModule {}
