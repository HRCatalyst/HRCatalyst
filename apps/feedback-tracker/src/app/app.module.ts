import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedFeatureModule } from '@hrc/shared-feature';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { HomeFeatureModule } from '@hrc/home-feature';
import { AssociateFeatureModule } from '@hrc/associate-feature';
import { AuthFeatureModule } from '@hrc/auth-feature';
import { CampaignFeatureModule } from '@hrc/campaign-feature';
import { ClientFeatureModule } from '@hrc/client-feature';
import { CompanyFeatureModule } from '@hrc/company-feature';
import { FeedbackFeatureModule } from '@hrc/feedback-feature';
import { ImportFeatureModule } from '@hrc/import-feature';
import { InterviewFeatureModule } from '@hrc/interview-feature';
import { ParticipantFeatureModule } from '@hrc/participant-feature';
import { QuestionFeatureModule } from '@hrc/question-feature';
import { RaterFeatureModule } from '@hrc/rater-feature';
import { UserFeatureModule } from '@hrc/user-feature';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedFeatureModule,
    AssociateFeatureModule,
    AuthFeatureModule,
    CampaignFeatureModule,
    ClientFeatureModule,
    CompanyFeatureModule,
    FeedbackFeatureModule,
    HomeFeatureModule,
    ImportFeatureModule,
    InterviewFeatureModule,
    ParticipantFeatureModule,
    QuestionFeatureModule,
    RaterFeatureModule,
    UserFeatureModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
        const firestore = getFirestore();
        enableIndexedDbPersistence(firestore);
        return firestore;
    }),
    AuthModule,
    FirestoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


