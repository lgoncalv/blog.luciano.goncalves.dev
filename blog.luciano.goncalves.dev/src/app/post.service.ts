import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostSummary } from './posts/post-summary';
import { Post } from './posts/post';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = environment.api.url;

    constructor(private http: HttpClient) {
    }

    getPostSummaries(): Observable<PostSummary[]> {
        return this.http.get<PostSummary[]>(`${this.apiUrl}/api/postSummaries`);
    }

    getPost(permalink: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/api/posts?permalink=${permalink}`)
            .pipe(tap( post => console.log(post)));
    }
}
