import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteModal {

  constructor(public activeModal: NgbActiveModal, public modalService: NgbModal) { }

  @Input() todo!: Todo;
  @Output() confirmDeleteTodoEmitter: EventEmitter<number> = new EventEmitter<number>();

  close(){
    this.modalService.dismissAll();
  }

  confirmDeleteTodo(todoId: number | undefined ){
    this.confirmDeleteTodoEmitter.emit(todoId);
    this.close();
  }
}
