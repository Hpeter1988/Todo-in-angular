import { TestBed } from '@angular/core/testing';

import { HttpCallsService } from './http-calls.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('XHRService', () => {
  let service: HttpCallsService;
  let httpMock: HttpTestingController;

  const mockData = { key1: 'value1', key2: 2 };
  const API_ENDPOINT = {
    foo: 'foo',
    bar: 'baz',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(HttpCallsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('should call the endpoint with the proper URL', () => {
      service.get(API_ENDPOINT.foo).subscribe();
      const request = httpMock.expectOne(API_ENDPOINT.foo);
      request.flush(mockData);

      expect(request.request.method).toBe('GET');
    });

    it('should return the received value', (done) => {
      service.get(API_ENDPOINT.foo).subscribe((response) => {
        expect(response).toBe(mockData);
        done();
      });
      const request = httpMock.expectOne(API_ENDPOINT.foo);
      request.flush(mockData);
    });
    // todo put and post endpoint tests and test for error handling
  });
});
