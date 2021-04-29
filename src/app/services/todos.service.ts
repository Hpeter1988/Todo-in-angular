import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  getTodos(): Todo[] {
    return TODOS;
  }
}
