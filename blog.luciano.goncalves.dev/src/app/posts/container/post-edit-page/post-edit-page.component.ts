import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostEdit } from '../../post';
import { Constants } from 'src/app/constants';
import * as moment from 'moment';

@Component({
  selector: 'lgblog-post-edit-page',
  templateUrl: './post-edit-page.component.html',
  styleUrls: ['./post-edit-page.component.scss']
})
export class PostEditPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  
  post: PostEdit;
  previewMode = false;
  loading = true;

  constructor(private titleService: Title,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params
      .subscribe(params => {
        this.subscriptions.push(this.postService.getPostForEditById(params.id).subscribe(post => {
          this.post = post;
          this.titleService.setTitle(this.getTitle());
          this.loading = false;
        }))
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  savePost(post: PostEdit): void {
    this.loading = true;
    this.subscriptions.push(this.postService.savePost(post).subscribe(post => {
      if (post.published) {
        this.router.navigateByUrl(`/post/${post.slug}`);
      } else {
        this.router.navigateByUrl(`/drafts`);
      }
    }));
  }

  preview(post: PostEdit): void {
    this.post = post;
    this.post.updatedOn = moment().unix();
    this.previewMode = true;
  }

  cancelPreview(): void {
    this.previewMode = false;
  }

  private getTitle(): string {
    if (this.post.id === 'new') {
      return `${Constants.appTitle} - New post`;
    } else {
      return `${Constants.appTitle} - Edit post: ${this.post.title}`;
    }
  }
}
