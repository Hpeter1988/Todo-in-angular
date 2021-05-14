import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteModal {

  constructor(private modalService: NgbActiveModal) { }

  @Input() todo!: Todo;
  @Output() confirmDeleteTodoEmitter: EventEmitter<number> = new EventEmitter<number>();

  close(){
    this.modalService.close();
  }

  confirmDeleteTodo(todoId: number | undefined ){
    this.confirmDeleteTodoEmitter.emit(todoId);
    this.close();
  }
}
