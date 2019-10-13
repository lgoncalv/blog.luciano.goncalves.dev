import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostDraftSummary } from '../../post';

@Component({
  selector: 'lgblog-draft-list-page',
  templateUrl: './draft-list-page.component.html',
  styleUrls: ['./draft-list-page.component.scss']
})
export class DraftListPageComponent implements OnInit {
  drafts$: Observable<PostDraftSummary[]>;

  constructor(private router: Router,
    private postService: PostService) { }

  ngOnInit() {
    this.drafts$ = this.postService.getDrafts();
  }

  newPost(): void {
    this.router.navigateByUrl('/post/new/edit');
  }

  editPost(id: string) {
    this.router.navigateByUrl(`/post/${id}/edit`);
  }
}
