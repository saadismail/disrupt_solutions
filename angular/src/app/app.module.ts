import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { QuestionComponent } from './components/question/question.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { TagQuestionComponent } from './components/tag-question/tag-question.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagComponent } from './components/tag/tag.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-question', component: NewQuestionComponent, canActivate:[AuthGuard] },
  { path: 'question/:id', component: QuestionComponent },
  { path: 'tag-question/:id', component: TagQuestionComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'tag/:id', component: TagComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NewQuestionComponent,
    QuestionComponent,
    ForgetPasswordComponent,
    TagQuestionComponent,
    TagsComponent,
    TagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
