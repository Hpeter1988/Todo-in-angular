import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorObserver } from 'rxjs/internal/types';
import { HttpErrorResponse } from '@angular/common/http';

import { TodoService } from './todo.service';
import { environment } from '../../environments/environment';
import { Todo } from '../interfaces/todo';

describe('TODO SERVICE', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  const url = `${environment.baseUrl}/todos`;
  const mockTodos: Todo[] = [{
    name: "TESTING",
    isDone: false,
    id: 4
  }];

  const mockTodoWithoutId: Todo = {
    name: "TESTING",
    isDone: false,
    id: 4
  };

  const mockErrorMessage = 'Error';

  beforeEach(() => {
  TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  service = TestBed.inject(TodoService);
  httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should call the endpoint with the proper URL', () => {
      service.getTodos().subscribe();
      const request = httpMock.expectOne(url);
      request.flush(mockTodos);

      expect(request.request.method).toBe('GET');
    });

    it('should return the received value and console.log success', (done) => {
      service.getTodos().subscribe((response) => {
        expect(response).toBe(mockTodos);
        done();
      });

      const request = httpMock.expectOne(url);
      request.flush(mockTodos);
    });

    it('should throw an error if the request failed', (done) => {
      const errorObserver: ErrorObserver<any> = {
        error: (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          expect(error.statusText).toBe(mockErrorMessage);
          done();
        },
      };

      service.getTodos().subscribe(errorObserver);
      const request = httpMock.expectOne(url);
      request.error(new ErrorEvent('error'), { statusText: mockErrorMessage });
    });
  });

  describe('createTodos', () => {
    it('should call the endpoint with the proper URL', () => {
      service.createTodo(mockTodoWithoutId).subscribe();
      const request = httpMock.expectOne(url);
      request.flush(mockTodos);

      expect(request.request.method).toBe('POST');
    });

    it('should return the received value and console.log success', (done) => {
      service.createTodo(mockTodoWithoutId).subscribe((response: Todo) => {
        expect(response).toBe(mockTodos[0]);
        expect(console.log).toHaveBeenCalledWith(`Created successfully`);
        done();
      });

      spyOn(console, 'log')
      const request = httpMock.expectOne(url);
      request.flush(mockTodos[0]);
    });

    it('should throw an error if the request failed', (done) => {
      const errorObserver: ErrorObserver<any> = {
        error: (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          expect(error.statusText).toBe(mockErrorMessage);
          done();
        },
      };

      service.createTodo(mockTodos[0]).subscribe(errorObserver);
      const request = httpMock.expectOne(url);
      request.error(new ErrorEvent('error'), { statusText: mockErrorMessage });
    });
  });

  describe('updateTodo', () => {
    it('should call the endpoint with the proper URL', () => {
      service.updateTodo(mockTodos[0]).subscribe();
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.flush(mockTodos[0]);

      expect(request.request.method).toBe('PUT');
    });

    it('should return the received value and console.log success', (done) => {
      service.updateTodo(mockTodos[0]).subscribe((response: Todo) => {
        expect(response).toBe(mockTodos[0]);
        expect(console.log).toHaveBeenCalledWith(`Updated successfully`);
        done();
      });

      spyOn(console, 'log')
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.flush(mockTodos[0]);
    });

    it('should throw an error if the request failed', (done) => {
      const errorObserver: ErrorObserver<any> = {
        error: (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          expect(error.statusText).toBe(mockErrorMessage);
          done();
        },
      };

      service.updateTodo(mockTodos[0]).subscribe(errorObserver);
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.error(new ErrorEvent('error'), { statusText: mockErrorMessage });
    });
  });

  describe('deleteTodo', () => {
    it('should call the endpoint with the proper URL', () => {
      service.deleteTodo(mockTodos[0].id).subscribe();
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.flush(mockTodos[0]);

      expect(request.request.method).toBe('DELETE');
    });

    it('should return the received value and console.log success', (done) => {
      service.deleteTodo(mockTodos[0].id).subscribe((response: Todo) => {
        expect(response).toBe(mockTodos[0]);
        expect(console.log).toHaveBeenCalledWith(`Deleted successfully`);
        done();
      });

      spyOn(console, 'log')
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.flush(mockTodos[0]);
    });

    it('should throw an error if the request failed', (done) => {
      const errorObserver: ErrorObserver<any> = {
        error: (error: HttpErrorResponse) => {
          expect(error).toBeDefined();
          expect(error.statusText).toBe(mockErrorMessage);
          done();
        },
      };

      service.deleteTodo(mockTodos[0].id).subscribe(errorObserver);
      const request = httpMock.expectOne(`${url}/${mockTodos[0].id}`);
      request.error(new ErrorEvent('error'), { statusText: mockErrorMessage });
    });
  });
});