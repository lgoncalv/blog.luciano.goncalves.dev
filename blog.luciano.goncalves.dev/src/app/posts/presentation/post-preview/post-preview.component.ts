import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostEdit } from '../../post';

@Component({
  selector: 'lgblog-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {
  @Input() selectedPost: PostEdit;
  @Output() cancelPreviewEvent = new EventEmitter<void>();
  
  constructor() { }

  cancelPreview(): void {
    this.cancelPreviewEvent.emit();
  }

}
