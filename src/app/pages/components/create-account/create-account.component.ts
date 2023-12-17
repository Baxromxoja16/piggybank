import { Component } from '@angular/core';
import { UpDirective } from '../../../auth/directives/up.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [UpDirective, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  lettersReg = new RegExp('[A-Za-z]');
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'UZS', 'RUB'];
  selected = 'USD'

  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.pattern(this.lettersReg)]),
    currency: new FormControl(['USD']),
    description: new FormControl(null, [Validators.maxLength(256)]),
  })

  constructor(){}

  onSubmit() {
    console.log(this.createForm);
    console.log(this.createForm.get('description')?.hasError('maxLength'));
  }
}
