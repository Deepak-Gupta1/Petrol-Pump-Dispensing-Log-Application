import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFuelNumberCheck]',
  standalone: true
})
export class FuelNumberCheckDirective {

 private regex = /^\d+(\.\d{0,2})?$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value === '' || this.regex.test(value)) {
      // Valid input: do nothing
    } else {
      // Remove last character if invalid
      input.value = value.slice(0, -1);
    }
  }

}
