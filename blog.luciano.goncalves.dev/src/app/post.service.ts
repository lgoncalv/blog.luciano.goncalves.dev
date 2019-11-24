import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PostEdit, PostDraftSummary, PostSummary, PostView, PostSaved } from './posts/post';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = `${environment.api.url}/api/v1`;

    constructor(private http: HttpClient) {
    }

    getDrafts(): Observable<PostDraftSummary[]> {
        return this.http.get<PostDraftSummary[]>(`${this.apiUrl}/posts/drafts`)
            .pipe(tap(posts => console.log(posts)));
    }

    getPostSummaries(): Observable<PostSummary[]> {
        return this.http.get<PostSummary[]>(`${this.apiUrl}/posts`);
    }

    getPostBySlug(slug: string): Observable<PostView> {
        return this.http.get<PostView>(`${this.apiUrl}/posts/slug/${slug}`)
            .pipe(tap(post => console.log(post)));
    }

    getPostForEditById(id: string): Observable<PostEdit> {
        if (id === 'new') {
            return of({
                id: 'new',
                published: false,
                title: '',
                summary: ''
            });
        } else {
            return this.http.get<PostEdit>(`${this.apiUrl}/posts/${id}`)
                .pipe(tap(post => console.log(post)));
        }
    }

    savePost(post: PostEdit): Observable<PostSaved> {
        if (post.id === 'new') {
            return this.createPost(post);
        } else {
            return this.updatePost(post);
        }
    }

    deletePost(postId: string): Observable<{}> {
        return this.http.delete(`${this.apiUrl}/posts/${postId}`)
            .pipe(tap(_ => console.log('post deleted')));
    }

    private createPost(post: PostEdit): Observable<PostSaved> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<PostSaved>(`${this.apiUrl}/posts`, post, { headers: headers })
            .pipe(
                tap(data => console.log('create post: ' + JSON.stringify(data)))
            );
    }

    private updatePost(post: PostEdit): Observable<PostSaved> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<PostSaved>(`${this.apiUrl}/posts`, post, { headers: headers })
            .pipe(
                tap(data => console.log('update post: ' + JSON.stringify(data)))
            );
    }
}
