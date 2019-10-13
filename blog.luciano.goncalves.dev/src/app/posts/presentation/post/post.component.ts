import { Component, OnInit, Input } from '@angular/core';
import { PostEdit } from '../../post';

@Component({
  selector: 'lgblog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostEdit;
  
  get content(): string {
    return this.post.content 
      ? this.post.content
      : this.post.summary
  }
  constructor() { }

  ngOnInit() {
  }
}
