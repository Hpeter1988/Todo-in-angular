import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { HttpCallsService } from '../services/http-calls.service';
import { Todo } from '../interfaces/todo';
import { } from '../attributeDirectives/is-invalid.directive'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  private baseUrl = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpCallsService: HttpCallsService) { }

  ngOnInit(): void {
    this.httpCallsService.get<Todo[]>(
      `${this.baseUrl}/todos`, this.httpOptions
    ).subscribe(
      (todos: Todo[]) => this.todos = todos
    )
  }

  addTodo(newTodo: Todo): void {
    this.todos.unshift(newTodo);
  }

  updateTodo(todo: Todo): void {
    // add loading while updating not let user press checkbox or change to icons
    const body: Todo = { ...todo, isDone: !todo.isDone }
    this.httpCallsService.put<Todo>(
      `${this.baseUrl}/todos/${todo.id}`,body, this.httpOptions
    ).subscribe(
      (updatedTodo: Todo) => {
       const indexOfUpdatedTodo = this.todos.findIndex( todo => todo.id === updatedTodo.id)
       this.todos[indexOfUpdatedTodo] = updatedTodo
      }
    )
  }

  deleteTodo(todoId: Number | undefined): void {
    this.httpCallsService.delete<Todo>(
      `${this.baseUrl}/todos/${todoId}`, this.httpOptions
    ).subscribe(
      //json server returns an empty object
      (deletedTodo: Todo) => this.todos = this.todos.filter(todo => todo.id !== todoId)
    )
  }
}
