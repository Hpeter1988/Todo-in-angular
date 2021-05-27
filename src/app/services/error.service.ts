import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private error = new Subject<boolean>();

  constructor() {}

  addError(): void {
    this.error.next(true);
  }

  removeError(): void {
    this.error.next(false);
  }

  getError(): Observable<boolean> {
    return this.error.asObservable();
  }
}
