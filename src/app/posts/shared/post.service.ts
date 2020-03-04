import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from './post.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Base URL
  baseUrl = 'https://hacker-news-api-thieunv.herokuapp.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Get list posts
  getPosts(page: number): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + '/posts?page=' + page)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Get post detail
  getPost(url: string): Observable<Post> {
    return this.http.get<Post>(this.baseUrl + '/detail?url=' + url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
