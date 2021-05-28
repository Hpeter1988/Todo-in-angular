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

  onSubmit(newTodo: Todo): void {
    this.addTodoForm.markAllAsTouched();

    if(this.addTodoForm.valid){
      this.addTodoForm.reset();
      this.newTodoAddedEmitter.emit(newTodo);
    }
  }
}
