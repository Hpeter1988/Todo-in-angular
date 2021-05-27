import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private errorService: ErrorService,
  ) { }

  success(message: string):void {
    console.log(message)
  }

  error(error: Error):Observable<never> {
    this.errorService.addError();
    return throwError(error);
  }
}
