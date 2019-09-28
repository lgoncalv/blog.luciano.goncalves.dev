import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListPageComponent } from './posts/container/post-list-page/post-list-page.component';
import { PostPageComponent } from './posts/container/post-page/post-page.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: PostListPageComponent },
  { path: ':year/:month/:day/:slug', component: PostPageComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }