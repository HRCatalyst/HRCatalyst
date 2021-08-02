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
    loadChildren: () => import('@hrcatalyst/auth-feature').then(m => m.AuthFeatureModule)
  },
  {
    path: 'associate',
    loadChildren: () => import('@hrcatalyst/associate-feature').then(m => m.AssociateFeatureModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('@hrcatalyst/campaign-feature').then(m => m.CampaignFeatureModule)
  },
  {
    path: 'client',
    loadChildren: () => import('@hrcatalyst/client-feature').then(m => m.ClientFeatureModule)
  },
  {
    path: 'company',
    loadChildren: () => import('@hrcatalyst/company-feature').then(m => m.CompanyFeatureModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('@hrcatalyst/feedback-feature').then(m => m.FeedbackFeatureModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@hrcatalyst/home-feature').then(m => m.HomeFeatureModule)
  },
  {
    path: 'interview',
    loadChildren: () => import('@hrcatalyst/interview-feature').then(m => m.InterviewFeatureModule)
  },
  {
    path: 'import',
    loadChildren: () => import('@hrcatalyst/import-feature').then(m => m.ImportFeatureModule)
  },
  {
    path: 'participant',
    loadChildren: () => import('@hrcatalyst/participant-feature').then(m => m.ParticipantFeatureModule)
  },
  {
    path: 'question',
    loadChildren: () => import('@hrcatalyst/question-feature').then(m => m.QuestionFeatureModule)
  },
  {
    path: 'rater',
    loadChildren: () => import('@hrcatalyst/rater-feature').then(m => m.RaterFeatureModule)
  },
  {
    path: 'user',
    loadChildren: () => import('@hrcatalyst/user-feature').then(m => m.UserFeatureModule)
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
