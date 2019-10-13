import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { PostSummary } from '../../post';

@Component({
  selector: 'lgblog-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss'],

})
export class PostSummaryComponent {
  @Input() post: PostSummary;

  get postUrl(): string {
    return `post/${this.post.slug}`;
  }

  constructor() { }
}
