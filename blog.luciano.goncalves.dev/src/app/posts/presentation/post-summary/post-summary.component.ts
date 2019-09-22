import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { PostSummary } from '../../post-summary';
import * as moment from 'moment';

@Component({
  selector: 'lgblog-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss'],

})
export class PostSummaryComponent implements OnInit {
  @Input() post: PostSummary;

  get postUrl(): string {
    const createdOn = moment(this.post.createdOn * 1000);
    return `${createdOn.format('YYYY/MM/DD')}/${this.post.slug}`;
  }

  constructor() { }

  ngOnInit() {
  }
}
