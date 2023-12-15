import { Component } from '@angular/core';
import { UpDirective } from '../../../auth/directives/up.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [UpDirective, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    currency: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  })

  constructor(){}

  onSubmit() {
    console.log(this.createForm.valid);
  }
}
