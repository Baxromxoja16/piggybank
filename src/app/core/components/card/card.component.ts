import { Component, HostListener } from '@angular/core';
import { CreateAccountComponent } from '../../../pages/components/create-account/create-account.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CreateAccountComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  open: boolean = false;

  openCreateAccountPopup() {
    this.open = true;
  }
  @HostListener('click', ['$event.target'])
  clickedOut(target: HTMLElement) {
    if (
      target.className === 'close' ||
      target.className === 'black-bg' ||
      target.className.includes('btn-cancel')
    ) {
      this.closeCreateAccountPopup();
    }
  }

  closeCreateAccountPopup() {
    this.open = false;
  }
}
