import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostComponent } from './posts/post/post.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PostListComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:url', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
