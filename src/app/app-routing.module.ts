import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PostsComponent } from './posts/posts.component';
import { NewsComponent } from './news/news.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LikesComponent } from './likes/likes.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: 'miembros', component: MemberListComponent },
         { path: 'miembros/:username', component: MemberDetailComponent },
         { path: 'miembro/edit', component: MemberEditComponent },
         { path: 'recetas', component: RecipesComponent },
         { path: 'posts', component: PostsComponent },
         { path: 'noticias', component: NewsComponent },
         { path: 'likes', component: LikesComponent },
      ],
   },
   { path: 'errors', component: TestErrorComponent },
   { path: 'not-found', component: NotFoundComponent },
   { path: 'server-error', component: ServerErrorComponent },
   { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
