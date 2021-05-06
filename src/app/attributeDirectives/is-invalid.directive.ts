import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appIsInvalid]',
})
export class IsInvalidDirective {
  constructor(private ngControl: NgControl) {}
  //todo check why boolean is bad here
  @HostBinding('class.is-invalid') get invalid(): any {
    return this.ngControl.invalid && this.ngControl.touched;
  }
}
