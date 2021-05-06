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
    this.todos.push(newTodo);
  }

  updateTodo(todoId: any): void { 
    console.log(todoId)
    this.httpCallsService.get<Todo[]>(
      `${this.baseUrl}/todos/${todoId}`, this.httpOptions
    ).subscribe(
      (todos: Todo[]) => this.todos = todos
    )
  }
}
