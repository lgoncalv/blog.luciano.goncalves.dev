import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from '../post/post-list.component';
import { PostEditComponent } from '../post/post-edit.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/edit/:id', component: PostEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
