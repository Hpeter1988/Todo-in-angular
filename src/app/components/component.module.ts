import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TodosComponent } from './todos/todos.component';
import { CreateTodoComponent } from './/create-todo/create-todo.component';
import { ConfirmDeleteModal } from './confirm-delete/confirm-delete.component';
import { ErrorToastComponent } from './error-toast/error-toast.component';

@NgModule({
  declarations: [
    TodosComponent,
    CreateTodoComponent,
    ConfirmDeleteModal,
    ErrorToastComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class ComponentModule { }
