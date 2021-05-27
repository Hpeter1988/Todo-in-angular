import { Observable, of } from "rxjs";

export class MockErrorService {
  constructor() {}

  addError(): void {}

  removeError(): void {}

  getError(): Observable<any> {
    return of(true)
  }
}