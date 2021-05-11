import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { IsInvalidDirective } from './attributeDirectives/is-invalid.directive';
import { ErrorComponent } from './components/error/error.component';

// break up  smaller modules eg:. share, and component specific stuff

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CreateTodoComponent,
    IsInvalidDirective,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
