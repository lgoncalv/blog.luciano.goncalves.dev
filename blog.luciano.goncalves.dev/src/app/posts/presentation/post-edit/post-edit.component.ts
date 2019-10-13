import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PostEdit } from '../../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'lgblog-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit, OnChanges {
  @Input() selectedPost: PostEdit;
  @Input() loading: boolean;
  @Output() savePostEvent = new EventEmitter<PostEdit>();
  
  post: PostEdit;
  postForm: FormGroup;

  get canPublish(): boolean {
    return this.post ? !this.post.published : false;
  }

  constructor(private fb: FormBuilder) { 
    console.log('Initialize form');
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      content: [''] 
    });
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.selectedPost && changes.selectedPost.currentValue) {
      this.displayPost(changes.selectedPost.currentValue);
    }

    if (changes.loading && changes.loading.currentValue) {
      this.disableForm();
    } else {
      this.enableForm();
    }
  }

  private displayPost(post: PostEdit): void {
    this.post = { ...post };
    console.log('display post');
    console.log(this.post);
    this.postForm.patchValue({
      title: post.title,
      summary: post.summary,
      content: post.content
    });
    
  }

  private disableForm(): void {
    this.postForm.get('title').disable();
    this.postForm.get('summary').disable();
    this.postForm.get('content').disable();
  }

  private enableForm(): void {
    if (this.postForm) {
      this.postForm.get('title').enable();
      this.postForm.get('summary').enable();
      this.postForm.get('content').enable();
    }
  }

  savePost(): void {
    const now = moment().unix();
    if (this.postForm.valid) {
      this.post = {
        ...this.post,
        ...this.postForm.value,
        updatedOn: now
      }
      if (this.post.id === 'new') {
        this.post.createdOn = now;
      }
      this.savePostEvent.emit(this.post);
    }
  }

  saveAndPublishPost(): void {
    const now = moment().unix();
    if (this.postForm.valid) {
      this.post = {
        ...this.post,
        ...this.postForm.value,
        published: true,
        publishedOn: now,
        updatedOn: now
      }
      if (this.post.id === 'new') {
        this.post.createdOn = now;
      }
      this.savePostEvent.emit(this.post);
    }
  }

  cancel(): void {
    console.log('cancel');
  }

}
