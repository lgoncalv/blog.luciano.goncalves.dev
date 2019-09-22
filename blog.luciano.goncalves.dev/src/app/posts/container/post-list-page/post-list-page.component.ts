import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PostSummary } from '../../post-summary';

@Component({
  selector: 'lgblog-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit, OnDestroy {
  posts$: Observable<PostSummary[]>;

  private isLoggedIn = false;
  private subscriptions: Subscription[] = [];

  get isCreator(): boolean {
    return this.isLoggedIn;
  }

  constructor(private postService: PostService,
    private authService: AuthService) { }

  ngOnInit() {
    this.posts$ = this.postService.getPostSummaries();
    this.subscriptions.push(this.authService.user$.subscribe(user => {
      if (user && user.uid) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
