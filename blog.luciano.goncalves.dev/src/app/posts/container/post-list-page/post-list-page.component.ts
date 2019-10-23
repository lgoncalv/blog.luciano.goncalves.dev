import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/post.service';
import { PostSummary } from '../../post';
import { LoadingService } from 'src/app/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lgblog-post-list-page',
  templateUrl: './post-list-page.component.html',
  styleUrls: ['./post-list-page.component.scss']
})
export class PostListPageComponent implements OnInit, OnDestroy {
  posts: PostSummary[];
  postsSubscription: Subscription;

  constructor(private postService: PostService, 
    private titleService: Title,
    private loadingService: LoadingService) { 
      this.loadingService.setIsLoading(true);
    }

  ngOnInit() {
    this.titleService.setTitle('LG\'s blog');
    this.postsSubscription = this.postService.getPostSummaries().subscribe(posts => {
      this.posts = posts;
      this.loadingService.setIsLoading(false);
    })
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}
