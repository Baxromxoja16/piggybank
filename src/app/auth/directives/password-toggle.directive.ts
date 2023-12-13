import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  standalone: true,
})
export class PasswordToggleDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    const input = this.el.nativeElement.parentNode.children[1];
    
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
