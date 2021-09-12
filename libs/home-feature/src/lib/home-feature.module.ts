import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeComponent } from './home.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthFeatureModule } from '@hrcatalyst/auth-feature';
import { ImportFeatureModule } from '@hrcatalyst/import-feature';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    AuthFeatureModule,
    ImportFeatureModule,
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class HomeFeatureModule {}
