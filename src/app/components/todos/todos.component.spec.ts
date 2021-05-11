import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TodosComponent } from './todos.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { Component, EventEmitter, Output } from '@angular/core';

export class MockTodoService {
  getTodos(): void {}

  createTodo(todo: Todo): void {}

  updateTodo (todo: Todo): void {}

  deleteTodo(todoId: number | undefined): any {}
}

@Component({
  selector: 'app-create-todo',
  template: '<button class="mockCreateTodo" (click)="onClick()">Create</button>',
})
export class MockCreateTodoComponent {
  
  constructor() {}
  @Output() public newTodoAddedEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent, MockCreateTodoComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: TodoService, useClass: MockTodoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    todoService = TestBed.inject(TodoService);
    spyOn(todoService, 'getTodos').and.returnValue( of(mockTodos) );
    spyOn(todoService, 'createTodo').and.returnValue( of(mockTodos[0]) );
    spyOn(todoService, 'updateTodo').and.returnValue( of(mockTodos[0]) );

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('check if todos displayed', () => {
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
  });

  it('if checkbox clicked updateTodo called', fakeAsync(() => {
    spyOn(component, 'updateTodo');
  
    const firstCheckBox = fixture.nativeElement.querySelector('input');
    firstCheckBox.click();
    tick();
    expect(component.updateTodo).toHaveBeenCalledOnceWith(mockTodos[0]);
  
  }));

  it('Check if child component emits event calls createTodo', fakeAsync(() => {
    spyOn(component, 'createTodo');
  
    const createButton = fixture.nativeElement.querySelector('.mockCreateTodo');
    createButton.click();
    tick();
    expect(component.createTodo).toHaveBeenCalledWith(mockTodos[0]);
  
    // test todo after popup implemented
  }));
});
