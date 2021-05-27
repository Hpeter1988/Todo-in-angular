import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { IsInvalidDirective } from './attributeDirectives/is-invalid.directive';
import { ConfirmDeleteModal } from './components/confirm-delete/confirm-delete.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';

// break up  smaller modules eg:. share, and component specific stuff

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CreateTodoComponent,
    IsInvalidDirective,
    ConfirmDeleteModal,
    ErrorToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class serviceModule { }
