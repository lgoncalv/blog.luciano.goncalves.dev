import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from '../../post';

@Component({
  selector: 'lgblog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() selectedPost: Post;
  post: Post;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.selectedPost && changes.selectedPost.currentValue) {
      this.post = changes.selectedPost.currentValue[0];
    }
  }

}
