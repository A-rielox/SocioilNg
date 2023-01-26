import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { FirstComponent } from './home/first/first.component';
import { SecondComponent } from './home/second/second.component';
import { ThirdComponent } from './home/third/third.component';
import { FourthComponent } from './home/fourth/fourth.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ShortenPipe } from './_pipes/shorten.pipe';
import { SeparatePipe } from './_pipes/separate.pipe';
import { AddRecipeComponent } from './recipes/add-recipe/add-recipe.component';
import { RecipeDisplayComponent } from './recipes/recipe-display/recipe-display.component';
import { IsOwnerOrAdminDirective } from './_directives/is-owner-or-admin.directive';
import { AddEditModule } from './add-edit/add-edit.module';

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
      MemberCardComponent,
      MemberEditComponent,
      FirstComponent,
      SecondComponent,
      ThirdComponent,
      FourthComponent,
      PhotoEditorComponent,
      TextInputComponent,
      LikesComponent,
      MessagesComponent,
      MemberMessagesComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagementComponent,
      RolesModalComponent,
      ShortenPipe,
      SeparatePipe,
      AddRecipeComponent,
      RecipeDisplayComponent,
      IsOwnerOrAdminDirective,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,

      SharedModule,
      NotificationsModule,
      ReactiveFormsModule,

      AddEditModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
