import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'appError',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  @Input() readonly message: string | undefined;

  constructor(public activeModal: NgbActiveModal) {
  }

  // make it work somehow and connect to backend errors
}
