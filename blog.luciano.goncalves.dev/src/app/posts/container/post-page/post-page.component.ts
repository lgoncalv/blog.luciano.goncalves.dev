import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lgblog-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit, OnDestroy {
  post: Post;

  private subscriptions: Subscription[] = [];

  constructor(private titleService: Title,
    private postService: PostService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.subscriptions.push(this.postService.getPost(params.slug).subscribe(post => {
        this.post = post;
        this.titleService.setTitle(`LG's blog: ${this.post.title}`);
      }))
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
