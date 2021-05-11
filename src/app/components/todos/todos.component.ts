import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  createTodo(newTodo: Todo): void {
    this.todoService.createTodo(newTodo).subscribe((newTodo) => (this.todos.unshift(newTodo)));
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      const indexOfUpdatedTodo = this.todos.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      this.todos[indexOfUpdatedTodo] = updatedTodo;
    });
  }

  deleteTodo(todoId: number | undefined): void {
    this.todoService.deleteTodo(todoId).subscribe(
      () => this.todos = this.todos.filter(todo => todo.id !== todoId)
    )
  }
}
