import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Todo } from '../../interfaces/todo';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = `${environment.baseUrl}/todos`;

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
    ) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      tap(_ => this.loggerService.success(`Got todos successfully`)),
      catchError(error => this.loggerService.error(error))
      );
  }

  createTodo (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo).pipe(
      tap(_ => this.loggerService.success(`Created successfully`)),
      catchError(error => this.loggerService.error(error))
      );
  }

  updateTodo (todo: Todo): Observable<any> {
    return this.http.put<any>(`${this.url}/${todo.id}`, todo).pipe(
      tap(_ => this.loggerService.success(`Updated successfully`)),
      catchError(error => this.loggerService.error(error))
      );
  }

  deleteTodo(todoId: number | undefined): Observable<any> {
    return this.http
      .delete<Todo>(`${this.url}/${todoId}`)
      .pipe(
        tap(_ => this.loggerService.success(`Deleted successfully`)),
        catchError(error => this.loggerService.error(error))
      );
  }
}
