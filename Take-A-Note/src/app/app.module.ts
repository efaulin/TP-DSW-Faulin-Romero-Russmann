import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { RouterModule, Routes } from '@angular/router';
import { LoggedHomeComponent } from './logged-home/logged-home.component';
import { HttpClientModule } from '@angular/common/http';
import { JoinboardComponent } from './joinboard/joinboard.component';
import { CreateboardComponent } from './createboard/createboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardnotesComponent } from './boardnotes/boardnotes.component';
import { DialogboardComponent } from './dialogboard/dialogboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  { path: 'logged-home', component: LoggedHomeComponent },
  { path: 'joinboard', component: JoinboardComponent },
  { path: 'createboard', component: CreateboardComponent },
  { path: 'joinboard/:id', component: BoardnotesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    PasswordChangeComponent,
    LoggedHomeComponent,
    JoinboardComponent,
    CreateboardComponent,
    BoardnotesComponent,
    DialogboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
