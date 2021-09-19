import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@hrc/auth-feature';
import { AssociateComponent } from '@hrc/associate-feature';
import { CampaignComponent } from '@hrc/campaign-feature';
import { HomeComponent } from '@hrc/home-feature';
import { ClientComponent } from '@hrc/client-feature';
import { CompanyComponent } from '@hrc/company-feature';
import { InterviewComponent } from '@hrc/interview-feature';
import { ImportComponent } from '@hrc/import-feature';
import { UserComponent } from '@hrc/user-feature';
import { RaterComponent } from '@hrc/rater-feature';
//import { QuestionComponent } from '@hrc/question-feature';
import { ParticipantComponent } from '@hrc/participant-feature';
import { FeedbackComponent } from '@hrc/feedback-feature';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
    //loadChildren: () => import('@hrc/auth-feature').then(m => m.AuthFeatureModule)
  },
  {
    path: 'associate',
    component: AssociateComponent
    //loadChildren: () => import('@hrc/associate-feature').then(m => m.AssociateFeatureModule)
  },
 {
   path: 'campaign',
   component: CampaignComponent
   //loadChildren: () => import('@hrc/campaign-feature').then(m => m.CampaignFeatureModule)
 },
 {
   path: 'client',
   component: ClientComponent
 //  loadChildren: () => import('@hrc/client-feature').then(m => m.ClientFeatureModule)
 },
 {
   path: 'company',
   component: CompanyComponent
 //  loadChildren: () => import('@hrc/company-feature').then(m => m.CompanyFeatureModule)
 },
 {
   path: 'feedback',
   component: FeedbackComponent
 //  loadChildren: () => import('@hrc/feedback-feature').then(m => m.FeedbackFeatureModule)
 },
 {
    path: 'home',
    component: HomeComponent
//    loadChildren: () => import('@hrc/home-feature').then(m => m.HomeFeatureModule)
 },
 {
   path: 'interview',
   component: InterviewComponent
//   loadChildren: () => import('@hrc/interview-feature').then(m => m.InterviewFeatureModule)
 },
 {
   path: 'import',
   component: ImportComponent
//   loadChildren: () => import('@hrc/import-feature').then(m => m.ImportFeatureModule)
 },
 {
   path: 'participant',
   component: ParticipantComponent
//   loadChildren: () => import('@hrc/participant-feature').then(m => m.ParticipantFeatureModule)
 },
//  {
//    path: 'question',
//    component: QuestionComponent
// //   loadChildren: () => import('@hrc/question-feature').then(m => m.QuestionFeatureModule)
//  },
 {
   path: 'rater',
   component: RaterComponent
//   loadChildren: () => import('@hrc/rater-feature').then(m => m.RaterFeatureModule)
 },
 {
   path: 'user',
   component: UserComponent
//   loadChildren: () => import('@hrc/user-feature').then(m => m.UserFeatureModule)
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
