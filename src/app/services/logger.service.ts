import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private errorService: ErrorService,
  ) { }

  success(massage: string):void {
    console.log(massage)
  }

  error(error: Error):Observable<never> {
    this.errorService.addError();
    return throwError(error);
  }
}
