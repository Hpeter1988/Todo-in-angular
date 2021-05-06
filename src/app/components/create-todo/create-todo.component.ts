import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

import { HttpCallsService } from '../../services/http-calls.service';
import { Todo } from '../../interfaces/todo';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  newTodo: Todo = {
    name: '',
    isDone: false
  };

  private baseUrl = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  @Output() newTodoAddedEmitter = new EventEmitter<Todo>();

  constructor(private formBuilder: FormBuilder, private httpCallsService: HttpCallsService) {}

  addTodoForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });

  ngOnInit(): void {}

  createTodo(newTodo: Todo): void {
    this.httpCallsService.post<Todo>(
      `${this.baseUrl}/todos`, newTodo, this.httpOptions
    ).subscribe(
      (todo: Todo) => {this.newTodoAddedEmitter.emit(todo)}
      )
  }
}
