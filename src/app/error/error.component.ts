import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  @Input() readonly message: string | undefined;

  constructor(public activeModal: NgbActiveModal) {
  }
}
