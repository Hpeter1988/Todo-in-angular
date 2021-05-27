import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorToastComponent } from './error-toast.component';
import { MockErrorService } from '../../mocksForTesting/mockErrorService';
import { ErrorService } from '../../services/error/error.service';
import { of } from 'rxjs';

describe('ErrorToastComponent', () => {
  let component: ErrorToastComponent;
  let fixture: ComponentFixture<ErrorToastComponent>;
  let errorService: ErrorService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorToastComponent ],
      providers: [{ provide: ErrorService, useClass: MockErrorService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorToastComponent);
    errorService = TestBed.inject(ErrorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get errors onInit', () => {
    spyOn(errorService, 'getError').and.returnValue(of(true));

    component.ngOnInit();

    expect(errorService.getError).toHaveBeenCalled();
  });

  it('should remove error if closed', () => {
    spyOn(errorService, 'removeError');

    component.closeError();

    expect(errorService.removeError).toHaveBeenCalled();
  });
});
