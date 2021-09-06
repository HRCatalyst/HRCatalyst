import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/interview.reducer';
import { InterviewEffects } from './+state/interview.effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { InterviewComponent } from './interview.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InterviewComponent
      }
    ]),
    StoreModule.forFeature('interview', reducer),
    EffectsModule.forFeature([InterviewEffects]),
  ],
  declarations: [
    InterviewComponent
  ],
  exports: [
    InterviewComponent
  ],
  providers: [
    AngularFirestore
  ]
})
export class InterviewFeatureModule {}
