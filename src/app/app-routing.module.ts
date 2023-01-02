import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PostsComponent } from './posts/posts.component';
import { NewsComponent } from './news/news.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: 'miembros', component: MemberListComponent },
         { path: 'miembros/:id', component: MemberDetailComponent },
         { path: 'recetas', component: RecipesComponent },
         { path: 'posts', component: PostsComponent },
         { path: 'noticias', component: NewsComponent },
      ],
   },
   { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
