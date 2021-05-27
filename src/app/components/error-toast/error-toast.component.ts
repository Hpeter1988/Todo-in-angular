import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.css']
})
export class ErrorToastComponent implements OnInit {
  show = false;

  constructor(
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.errorService.getError().subscribe(
      (error) => {
        this.show = error
      }
    )
  }

  closeError():void {
    this.errorService.removeError();
  }
}
