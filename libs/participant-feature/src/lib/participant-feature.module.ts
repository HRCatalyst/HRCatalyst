import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParticipantComponent } from './participant/participant.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipantComponent
      }
    ]),
  ],
  declarations: [
    ParticipantComponent
  ],
  exports: [
    ParticipantComponent
  ],
})
export class ParticipantFeatureModule {}
