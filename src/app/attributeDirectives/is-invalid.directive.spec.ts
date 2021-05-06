import { IsInvalidDirective } from './is-invalid.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
@Component({
  template: `
    <form [formGroup]="checkForm">
      <input appIsInvalid formControlName="example" type="text" />
    </form>
    <div>Click me</div>
  `,
})
export class MockComponent {
  constructor(private formBuilder: FormBuilder) {}

  checkForm = this.formBuilder.group({
    example: [null, [Validators.required]],
  });
}

describe('IsInvalidDirective:', () => {
  let fixture: ComponentFixture<MockComponent>;
  let inputAsDebugelement: DebugElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MockComponent, IsInvalidDirective],
    });

    fixture = TestBed.createComponent(MockComponent);
    inputAsDebugelement = fixture.debugElement.queryAll(By.directive(IsInvalidDirective))[0];
    input = fixture.nativeElement.querySelector('input');
  });

  it('If invalid value and clicked away, directive invalid method should return true', () => {
    inputAsDebugelement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    inputAsDebugelement.triggerEventHandler('blur', null);
    fixture.detectChanges();

    const directiveInstance = inputAsDebugelement.injector.get<IsInvalidDirective>(IsInvalidDirective);

    expect(directiveInstance.invalid).toBe(true);
    expect(input.className).toContain('is-invalid');
  });

  it('If valid value and clicked away, directive invalid method should return false', () => {
    inputAsDebugelement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    input.value = '1';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputAsDebugelement.triggerEventHandler('blur', null);
    fixture.detectChanges();

    const directiveInstance = inputAsDebugelement.injector.get<IsInvalidDirective>(IsInvalidDirective);
    expect(directiveInstance.invalid).toBe(false);
    expect(input.className).not.toContain('is-invalid');
  });

  it('If invalid value and NOT clicked away, directive invalid method should return false', () => {
    inputAsDebugelement.triggerEventHandler('focus', null);
    fixture.detectChanges();

    const directiveInstance = inputAsDebugelement.injector.get<IsInvalidDirective>(IsInvalidDirective);

    expect(directiveInstance.invalid).toBe(false);
    expect(input.className).not.toContain('is-invalid');
  });
});
