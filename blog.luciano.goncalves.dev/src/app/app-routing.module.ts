import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListPageComponent } from './posts/container/post-list-page/post-list-page.component';
import { PostPageComponent } from './posts/container/post-page/post-page.component';
import { LoginComponent } from './login/login.component';
import { PostEditPageComponent } from './posts/container/post-edit-page/post-edit-page.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { WildcardComponent } from './wildcard/wildcard.component';


const routes: Routes = [
  { path: '', component: PostListPageComponent },
  { path: ':year/:month/:day/:slug', component: PostPageComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'post/:id/edit', component: PostEditPageComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: WildcardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }