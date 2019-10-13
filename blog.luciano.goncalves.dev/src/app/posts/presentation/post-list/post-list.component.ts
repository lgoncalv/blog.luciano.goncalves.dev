import { Component, Input } from '@angular/core';
import { PostSummary } from '../../post';

@Component({
  selector: 'lgblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts: PostSummary[];
  
  constructor() { }

}
