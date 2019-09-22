import { Component, OnInit, Input } from '@angular/core';
import { PostSummary } from '../../post-summary';

@Component({
  selector: 'lgblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: PostSummary[];
  
  constructor() { }

  ngOnInit() {
  }

}
