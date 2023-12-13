import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUp]',
  standalone: true,
})
export class UpDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLElement): void {
    this.el.nativeElement.parentNode.children[0].classList.add('up');
  }

  @HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    if (!target.value) {
      this.el.nativeElement.parentNode.children[0].classList.remove('up');
    }
  }
}
