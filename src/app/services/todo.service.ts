import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = `${environment.baseUrl}/todos`;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      tap(_ => this.log(`Got todos successfully`)),
      catchError(this.errorHandler)
    );
  }

  createTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo).pipe(
      tap(_ => this.log(`Created successfully`)),
      catchError(this.errorHandler)
    );
  }

  updateTodo (todo: Todo): Observable<any> {
    return this.http.put<any>(`${this.url}/${todo.id}`, todo).pipe(
      tap(_ => this.log(`Updated successfully`)),
      catchError(this.errorHandler)
    );
  }

  deleteTodo(todoId: number | undefined): Observable<Todo> {
    return this.http
      .delete<Todo>(`${this.url}/${todoId}`)
      .pipe(
        tap(_ => this.log(`Deleted successfully`)),
        catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  } 

  private log(message: string) {
    console.log(message);
  }
}
