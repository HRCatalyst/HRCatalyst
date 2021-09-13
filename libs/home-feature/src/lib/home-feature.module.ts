import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeComponent } from './home.component';
import { Firestore } from '@angular/fire/compat/firestore';
import { AuthFeatureModule } from '@hrc/auth-feature';
import { ImportFeatureModule } from '@hrc/import-feature';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { QuestionFeatureModule } from '@hrc/question-feature';

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
    QuestionFeatureModule,
    SharedFeatureModule,
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
    Firestore
  ]
})
export class HomeFeatureModule {}
