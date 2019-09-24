import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post';

@Component({
  selector: 'lgblog-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;

  private subscriptions: Subscription[] = [];

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.post$ = this.postService.getPost(params.slug);
    }, error => {
      console.log(`Error: ${error}`);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

}
