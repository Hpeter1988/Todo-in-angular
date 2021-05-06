import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpCallsService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options: object = {}): Observable<T> {
    return this.http
      .get<T>(url, { ...options })
      .pipe(catchError(this.errorHandler));
  }

  post<T>(url: string, body: any, options: object = {}): Observable<T> {
    return this.http
      .post<T>(url, body, { ...options })
      .pipe( catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    // todo handle errors
    return throwError(error);
  }
}