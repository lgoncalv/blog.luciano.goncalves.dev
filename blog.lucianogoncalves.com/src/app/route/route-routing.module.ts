import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from '../post/post-list.component';
import { PostEditComponent } from '../post/post-edit.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'post/edit/:id', component: PostEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
