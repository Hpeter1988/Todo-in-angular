import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../interfaces/todo';
import { ConfirmDeleteModal } from '../confirm-delete/confirm-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos.reverse()));
  }

  createTodo(newTodo: Todo): void {
    this.todoService.createTodo(newTodo).subscribe((newTodo) => (this.todos.unshift(newTodo)));
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe((updatedTodo: Todo) => {
      const indexOfUpdatedTodo = this.todos.findIndex(
        (todo) => todo.id === updatedTodo?.id
      );
      this.todos[indexOfUpdatedTodo] = updatedTodo;
    });
  }

  deleteTodo(todoId: number | undefined): void {
    this.todoService.deleteTodo(todoId).subscribe(
      () => this.todos = this.todos.filter(todo => todo.id !== todoId)
    )
  }

  openDeleteConfirmationModal(todo: Todo): void {  
      const modalRef = this.modalService.open(ConfirmDeleteModal);
      modalRef.componentInstance.todo = todo;

      modalRef.componentInstance.confirmDeleteTodoEmitter.subscribe((todoId: number | undefined) => {
        this.deleteTodo(todoId)
      })
  }
}
