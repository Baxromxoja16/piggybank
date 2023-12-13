import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUp]',
  standalone: true,
})
export class UpDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  labelELement = this.el.nativeElement.parentNode.children[0];

  inputClassList = this.el.nativeElement.parentNode.children[1].classList;

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLElement): void {
    this.labelELement.classList.add('up');
  }

  @HostListener('blur', ['$event.target'])
  onBlur(target: HTMLInputElement): void {
    if (!target.value) {
      this.labelELement.classList.remove('up');
    }
  }
}
