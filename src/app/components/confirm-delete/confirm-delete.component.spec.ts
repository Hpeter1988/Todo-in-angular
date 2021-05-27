import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteModal } from './confirm-delete.component';
import { Todo } from '../../interfaces/todo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

class MockNgbActiveModal {
  close(): void {}
};

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteModal;
  let fixture: ComponentFixture<ConfirmDeleteModal>;
  let modalService : NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteModal ],
      providers: [{provide: NgbActiveModal, useClass: MockNgbActiveModal}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteModal);
    modalService = TestBed.inject(NgbActiveModal);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('must call confirmDeleteTodo with the proper todoId and close method if confirm button clicked', () => {
    const mockTodo: Todo =   {
      name: 'TESTING 1',
      isDone: false,
      id: 4,
    };
    component.todo = mockTodo;
    fixture.detectChanges();

    spyOn(component, 'confirmDeleteTodo').and.callThrough();
    spyOn(component, 'close')

    const deleteButton = fixture.nativeElement.querySelector('.btn-danger');
    deleteButton.click();

    expect(component.confirmDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    expect(component.close).toHaveBeenCalled();
  });

  it('must call confirmDeleteTodo with even with empty object as todo and close method if confirm button clicked', () => {
    const mockTodo = {};
    component.todo = mockTodo as unknown as Todo;
    fixture.detectChanges();

    spyOn(component, 'confirmDeleteTodo').and.callThrough();
    spyOn(component, 'close')

    const deleteButton = fixture.nativeElement.querySelector('.btn-danger');
    deleteButton.click();

    expect(component.confirmDeleteTodo).toHaveBeenCalledWith(undefined);
    expect(component.close).toHaveBeenCalled();
  });

  it('must call close method if cancel button clicked', () => {
    spyOn(component, 'close')

    const cancelButton = fixture.nativeElement.querySelector('.btn-outline-secondary');
    cancelButton.click();

    expect(component.close).toHaveBeenCalled();
  });

  it('must call close of modalService if close method called', () => {
    spyOn(modalService, 'close')
    component.close();

    expect(modalService.close).toHaveBeenCalled();
  });
});
