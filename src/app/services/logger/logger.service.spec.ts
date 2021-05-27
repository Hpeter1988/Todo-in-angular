import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { ErrorService } from '../error/error.service';
import { MockErrorService } from '../../mocksForTesting/mockErrorService';
import { ErrorObserver } from 'rxjs';

describe('LoggerService', () => {
  let service: LoggerService;
  let errorService: ErrorService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ErrorService, useClass: MockErrorService }],
    });

    service = TestBed.inject(LoggerService);
    errorService = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should console log message if success called', () => {
    const fakeMessage: string = 'ok';

    spyOn(console, 'log')
    service.success(fakeMessage);
    expect(console.log).toHaveBeenCalledWith(fakeMessage);
  });

  it('should add error if error called', () => {
    const fakeError: Error = new Error('error');

    spyOn(errorService, 'addError');
    service.error(fakeError);

    expect(errorService.addError).toHaveBeenCalled();
  });

  it('should add error if error called', (done) => {
    const fakeError: Error = new Error('error');

    const errorObserver: ErrorObserver<any> = {
      error: (error: ErrorObserver<any>) => {
        expect(error).toBeDefined();
        done();
      },
    };
    
    service.error(fakeError).subscribe(errorObserver);
  });
});
