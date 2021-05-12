import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Todo } from '../../interfaces/todo';

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

  @Output() newTodoAddedEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private formBuilder: FormBuilder) {}

  addTodoForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });

  ngOnInit(): void {}

  createTodo(newTodo: Todo): void {
    this.newTodoAddedEmitter.emit(newTodo);
  }

  blur(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    element.blur();
  }
}
