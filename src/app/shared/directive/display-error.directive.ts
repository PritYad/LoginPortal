import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[displayError]'
})
export class DisplayErrorDirective implements AfterViewInit {
  @Input() displayError: string = '';

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const msg = this.displayError;
    let errorMsg: string = msg ?  this.displayError.replace('Firebase: ', '').split('. (')[0]: '';
      // remove prefix Firebase and code Id suffix
    this.elementRef.nativeElement.textContent = errorMsg;
  }
}
