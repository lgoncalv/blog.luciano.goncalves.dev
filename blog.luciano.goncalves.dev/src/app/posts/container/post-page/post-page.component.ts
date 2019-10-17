import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostEdit, PostView } from '../../post';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'lgblog-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: PostView;
  isLoggedIn = false;

  private subscriptions: Subscription[] = [];

  constructor(private titleService: Title,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.setIsLoading(true);
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.subscriptions.push(this.postService.getPostBySlug(params.slug).subscribe(post => {
        this.post = post;
        this.titleService.setTitle(`LG's blog: ${this.post.title}`);
        this.loadingService.setIsLoading(false);
      }))
    }, error => {
      console.log(`Error: ${error}`);
    }));

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
    })
  }

  editPost(): void {
    this.router.navigateByUrl(`/post/${this.post.id}/edit`);
  }
}
