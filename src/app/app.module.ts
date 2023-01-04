import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { SharedModule } from './_modules/shared.module';

import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PostsComponent } from './posts/posts.component';
import { NewsComponent } from './news/news.component';
import { NotificationsModule } from './notifications/notifications.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      LoginModalComponent,
      HomeComponent,
      RegisterModalComponent,
      MemberListComponent,
      MemberDetailComponent,
      RecipesComponent,
      PostsComponent,
      NewsComponent,
      TestErrorComponent,
      NotFoundComponent,
      ServerErrorComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,

      SharedModule,
      NotificationsModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
