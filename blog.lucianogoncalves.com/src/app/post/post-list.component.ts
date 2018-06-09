import { Component, OnInit } from '@angular/core';
import { IPost } from './post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [ './post-list.component.css' ]
})
export class PostListComponent implements OnInit {
  posts: IPost[];
  
  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getPosts().subscribe(posts=>{
      this.posts = posts;
    });
  }

}
