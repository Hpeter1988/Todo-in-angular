import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CreateTodoComponent } from './create-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an instanceof FormGroup', () => {
    expect(component.addTodoForm instanceof FormGroup).toBeTrue();
  });

  it('button should be disabled if no input', () => {
    const addButton = fixture.nativeElement.querySelector('.btn');

    expect(addButton.disabled).toBeTrue();
  });

    it('name field should exists within the form', () => {
      expect(component.addTodoForm.get('name')).toBeDefined();
    });

    it('name filed should be invalid if it is empty (required)', () => {
      expect(component.addTodoForm.get('name')?.invalid).toBeTrue();
      expect(component.addTodoForm.get('name')?.hasError('required')).toBeTrue();
    });

    it('name filed should be invalid if input not long enough', () => {
      component.addTodoForm.patchValue({name: 'a'});
      expect(component.addTodoForm.get('name')?.invalid).toBeTrue();
    });

    it('should be invalid if input is too long', () => {
      component.addTodoForm.patchValue({name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'});
      expect(component.addTodoForm.get('name')?.invalid).toBeTrue();
    });

    it('should be valid if input is between 2 - 50 long', () => {
      component.addTodoForm.patchValue({name: 'aa'});
      expect(component.addTodoForm.get('name')?.invalid).toBeFalse();
    });

    it('if input valid add button must call createTodo', () => {
      component.addTodoForm.patchValue({name: 'aa'});
      fixture.detectChanges();
      
      spyOn(component, 'createTodo')

      const addButton = fixture.nativeElement.querySelector('.btn');
      addButton.click();

      expect(component.createTodo).toHaveBeenCalled();
    });
});
