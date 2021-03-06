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
import { RoutingState } from 'src/app/routing-state.service';
import { FaviconService } from 'src/app/favicon.service';

@Component({
  selector: 'lgblog-post-edit-page',
  templateUrl: './post-edit-page.component.html',
  styleUrls: ['./post-edit-page.component.scss']
})
export class PostEditPageComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private previousRoute: string;
  private formDirty: boolean = false;
  
  post: PostEdit;
  previewMode = false;
  loading: Observable<boolean>;

  constructor(private _dialog: MatDialog,
    private titleService: Title,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private routingState: RoutingState,
    private faviconService: FaviconService) { 
      this.loading = this.loadingService.isLoading();
      this.previousRoute = this.routingState.getPreviousUrl();
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

  get isFormDirty(): boolean {
    return this.formDirty;
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
      this.setFormDirty(false);
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

  cancel(): void {
    this.router.navigateByUrl(this.previousRoute);
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

  setFormDirty(formDirty: boolean): void {
    this.formDirty = formDirty;
    this.faviconService.update(formDirty);
  }

  private getTitle(): string {
    if (this.post.id === 'new') {
      return `${Constants.appTitle} - New post`;
    } else {
      return `${Constants.appTitle} - Edit post: ${this.post.title}`;
    }
  }
}
