import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/shared.reducer';
import { SharedEffects } from './+state/shared.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature('shared', reducer),
    EffectsModule.forFeature([SharedEffects]),
  ],
})
export class SharedFeatureModule {}
