import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/import.reducer';
import { ImportEffects } from './+state/import.effects';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ImportComponent
      }
    ]),
    StoreModule.forFeature('import', reducer),
    EffectsModule.forFeature([ImportEffects]),
  ],
  declarations: [
    ImportComponent
  ],
  exports: [
    ImportComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class ImportFeatureModule {}
