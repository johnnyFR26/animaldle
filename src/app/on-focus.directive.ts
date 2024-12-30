import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appOnFocus]',
  standalone: true
})
export class OnFocusDirective implements AfterViewInit {

  @Input('appFocus') shouldFocus: boolean = true;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    if (!this.shouldFocus) {
      this.el.nativeElement.focus();
    }
  }

}
