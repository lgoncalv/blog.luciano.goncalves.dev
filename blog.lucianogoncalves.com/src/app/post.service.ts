import { Injectable } from '@angular/core';
import { IPost } from './post/post';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _apiUrl = environment.api.url;

  constructor(private _http: HttpClient) {
    
  }

  getPosts():Observable<IPost[]> {
    return this._http.get<IPost[]>(`${this._apiUrl}/blogposts`);
  }
}
