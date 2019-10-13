import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostDraftSummary } from '../../post';

@Component({
  selector: 'lgblog-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.scss']
})
export class DraftListComponent implements OnInit {
  @Input() drafts: PostDraftSummary[];
  @Output() newPostEvent = new EventEmitter<void>();
  @Output() editPostEvent = new EventEmitter<string>();

  displayedColumns: string[] = ['id', 'createdOn', 'title'];
  constructor() { }

  ngOnInit() {
  }

  editPost(post: PostDraftSummary) {
    this.editPostEvent.emit(post.id);
  }

}
