import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { TodosComponent } from './todos.component';
import { TodoService } from '../../services/todo/todo.service';
import { Todo } from '../../interfaces/todo';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export class MockTodoService {
  getTodos(): Observable<Todo[]> {
    return of([])
  }

  createTodo(todo: Todo): void {}

  updateTodo (todo: Todo): void {}

  deleteTodo (todoId: number | undefined): any {}

  openDeleteConfirmationModal(todo: Todo): any {}
};

class mockNgbModal {
  open(): void {}
};

class MockNgbModalRef {
  componentInstance = { confirmDeleteTodoEmitter: new EventEmitter<any>() };
};

@Component({
  selector: 'app-create-todo',
  template: '<button class="mockCreateTodo" (click)="onClick()">Create</button>',
})
export class MockCreateTodoComponent {
  
  constructor() {}
  @Output() public newTodoAddedEmitter = new EventEmitter<Todo>();
  public onClick(): void {
    this.newTodoAddedEmitter.emit(mockTodos[0])
  }
}

const mockTodos: Todo[] = [
  {
    name: 'TESTING 1',
    isDone: false,
    id: 4,
  },
  {
    name: 'TESTING 2',
    isDone: true,
    id: 5,
  },
];

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todoService: TodoService;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, MockCreateTodoComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: TodoService, useClass: MockTodoService },
        { provide: NgbModal, useClass: mockNgbModal }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    modalService = TestBed.inject(NgbModal);
    todoService = TestBed.inject(TodoService);
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('check if no li element displayed if no todos returned', () => {
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(0);
  });

  it('check if todos displayed', () => {
     spyOn(todoService, 'getTodos').and.returnValue( of(mockTodos) )
     component.ngOnInit();
     fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
  });

  it('if checkbox clicked updateTodo called', () => {
    spyOn(todoService, 'getTodos').and.returnValue( of(mockTodos) );
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component, 'updateTodo').and.callThrough();
  
    const firstCheckBox = fixture.nativeElement.querySelector('input');
    firstCheckBox.click();
    
    expect(component.updateTodo).toHaveBeenCalledOnceWith(mockTodos[0]);
  });

  it('Check if creatTodo child component emit event calls createTodo', () => {
    spyOn(component, 'createTodo').and.callThrough();
  
    const createButton = fixture.nativeElement.querySelector('.mockCreateTodo');
    createButton.click();

    expect(component.createTodo).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('Check if delete button clicked openDeleteConfirmationModal method called', () => {
    spyOn(todoService, 'getTodos').and.returnValue( of(mockTodos) );
    component.ngOnInit();
    fixture.detectChanges();

    spyOn(component, 'openDeleteConfirmationModal').and.callThrough();
  
    const deleteButton = fixture.nativeElement.querySelector('.delete-btn');
    deleteButton.click();

    expect(component.openDeleteConfirmationModal).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('Check if delete confirmed deleteVisit method is called', () => {
    spyOn(todoService, 'getTodos').and.returnValue( of(mockTodos) )
    spyOn(modalService, 'open').and.returnValue(mockModalRef as NgbModalRef);
    spyOn(component, 'deleteTodo');

    component.openDeleteConfirmationModal(mockTodos[0]);
    mockModalRef.componentInstance.confirmDeleteTodoEmitter.emit(mockTodos[0].id);
    expect(component.deleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('Check if updateTodo returns it updated todo', () => {
    component.todos = mockTodos;
    const mockUpdatedTodo: Todo = {
        name: 'TESTING 1',
        isDone: true,
        id: 4,
      };

    spyOn(todoService, 'updateTodo').and.returnValue( of(mockUpdatedTodo) );
    component.updateTodo(mockUpdatedTodo)

    fixture.detectChanges();
    console.log(component.todos)
    expect(component.todos[0]).toBe(mockUpdatedTodo);
  });

  it('Check if updateTodo returns with empty object', () => {
    component.todos = mockTodos;
    const mockUpdatedTodo = {}

    spyOn(todoService, 'updateTodo').and.returnValue( of(mockUpdatedTodo) );
    component.updateTodo(mockUpdatedTodo as unknown as Todo)

    fixture.detectChanges();
    
    expect(component.todos[0]).toBe(mockTodos[0]);
  });

  it('Check if updateTodo returns with undefined', () => {
    component.todos = mockTodos;
    const mockUpdatedTodo = undefined

    spyOn(todoService, 'updateTodo').and.returnValue( of(mockUpdatedTodo) );
    component.updateTodo(mockUpdatedTodo as unknown as Todo)

    fixture.detectChanges();
    
    expect(component.todos[0]).toBe(mockTodos[0]);
  });
});
