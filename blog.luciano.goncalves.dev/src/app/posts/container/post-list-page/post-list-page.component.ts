import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { PostSummary } from '../../post';

@Component({
  selector: 'lgblog-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit {
  posts$: Observable<PostSummary[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.getPostSummaries();
  }
}
