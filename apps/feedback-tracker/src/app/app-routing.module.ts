import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@hrc/auth-feature').then(m => m.AuthFeatureModule)
  },
  {
    path: 'associate',
    loadChildren: () => import('@hrc/associate-feature').then(m => m.AssociateFeatureModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('@hrc/campaign-feature').then(m => m.CampaignFeatureModule)
  },
  {
    path: 'client',
    loadChildren: () => import('@hrc/client-feature').then(m => m.ClientFeatureModule)
  },
  {
    path: 'company',
    loadChildren: () => import('@hrc/company-feature').then(m => m.CompanyFeatureModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('@hrc/feedback-feature').then(m => m.FeedbackFeatureModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@hrc/home-feature').then(m => m.HomeFeatureModule)
  },
  {
    path: 'interview',
    loadChildren: () => import('@hrc/interview-feature').then(m => m.InterviewFeatureModule)
  },
  {
    path: 'import',
    loadChildren: () => import('@hrc/import-feature').then(m => m.ImportFeatureModule)
  },
  {
    path: 'participant',
    loadChildren: () => import('@hrc/participant-feature').then(m => m.ParticipantFeatureModule)
  },
  {
    path: 'question',
    loadChildren: () => import('@hrc/question-feature').then(m => m.QuestionFeatureModule)
  },
  {
    path: 'rater',
    loadChildren: () => import('@hrc/rater-feature').then(m => m.RaterFeatureModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@hrc/user-feature').then(m => m.UserFeatureModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
