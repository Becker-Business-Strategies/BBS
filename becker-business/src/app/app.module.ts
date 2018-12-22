import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatDividerModule, MatBadgeModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './dialogs/login/login.component';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {ValidateService} from './services/validate.service';
import {JwtHelper} from 'angular2-jwt';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './dialogs/register/register.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MentoringComponent } from './components/planks/mentoring/mentoring.component';
import { InternationalComponent } from './components/planks/international/international.component';
import { MetricsComponent } from './components/planks/metrics/metrics.component';
import { StrategyComponent } from './components/planks/strategy/strategy.component';
import { RailwayComponent } from './components/planks/railway/railway.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlankHomeComponent } from './components/planks/plank-home/plank-home.component';
import {MessageComponent} from './dialogs/message/message.component';
import {ConfirmComponent} from 'src/app/dialogs/confirm/confirm.component';
import {MailerService} from './services/mailer.service';
import { ResetPassComponent } from './dialogs/reset-pass/reset-pass.component';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ClientListComponent,
    MentoringComponent,
    InternationalComponent,
    MetricsComponent,
    StrategyComponent,
    RailwayComponent,
    ProfileComponent,
    PlankHomeComponent,
    MessageComponent,
    ConfirmComponent,
    ResetPassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    MatCardModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatDividerModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    FormBuilder,
    ValidateService,
    AuthService,
    UserService,
    JwtHelper,
    MailerService,
    FlashMessagesService
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    MessageComponent,
    ConfirmComponent,
    ResetPassComponent
  ]
})
export class AppModule { }
