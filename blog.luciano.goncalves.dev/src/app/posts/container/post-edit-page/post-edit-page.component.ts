import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { PostEdit } from '../../post';
import { Constants } from 'src/app/constants';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { ConfirmPostDeleteDialogComponent } from '../../presentation/confirm-post-delete-dialog/confirm-post-delete-dialog.component';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'lgblog-post-edit-page',
  templateUrl: './post-edit-page.component.html',
  styleUrls: ['./post-edit-page.component.scss']
})
export class PostEditPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  
  post: PostEdit;
  previewMode = false;
  loading: Observable<boolean>;

  constructor(private _dialog: MatDialog,
    private titleService: Title,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.loading = this.loadingService.isLoading();
    this.subscriptions.push(this.activatedRoute.params
      .subscribe(params => {
        this.loadingService.setIsLoading(true);
        this.subscriptions.push(this.postService.getPostForEditById(params.id).subscribe(post => {
          this.post = post;
          this.titleService.setTitle(this.getTitle());
          this.loadingService.setIsLoading(false);
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
    this.loadingService.setIsLoading(true);
    this.subscriptions.push(this.postService.savePost(post).subscribe(post => {
      this.loadingService.setIsLoading(false);
      if (post.published) {
        this.router.navigateByUrl(`/post/${post.slug}`);
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

  deletePost(post: PostEdit): void {
    const dialogRef = this._dialog.open(ConfirmPostDeleteDialogComponent, {
      width: '500px',
      data: post
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.push(this.postService.deletePost(post.id)
          .subscribe(_ => {
            this.router.navigateByUrl(`/drafts`);
          }));
      }
    }));
  }

  private getTitle(): string {
    if (this.post.id === 'new') {
      return `${Constants.appTitle} - New post`;
    } else {
      return `${Constants.appTitle} - Edit post: ${this.post.title}`;
    }
  }
}
