import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// break up  smaller modules eg:. share, and component specific stuff

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [],
})
export class ServiceModule { }
