import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UpDirective } from '../../auth/directives/up.directive';
import { CategoryService } from '../../pages/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AccountService } from '../../pages/services/account.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, UpDirective],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnDestroy{
  subscription: Subscription = new Subscription();

  accountId = this.accountService.switchAccountSig()._id;

  reg = new RegExp(/[a-zA-Z]/gi)
  createForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.pattern(this.reg)]),
    accountId: new FormControl(this.accountId, [Validators.required]),
    type: new FormControl('income' || 'expense')
  })

  errorMessage = this.categoryService.errorMessage;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private accountService: AccountService) {}

  close() {
    this.router.navigate(['/categories']);
  }

  onSubmit() {
    if (this.createForm.valid) {
      const createdCategory = this.categoryService.createCategory(this.createForm.value).subscribe(
        () => {
          this.snackBar.open("Category created!", "Close", {
            duration: 4000
          })
          this.router.navigate(['/categories']);
        },
        (err) => {
          if (err.error.match('duplicate')[0]) {
            const message = 'A category with this name already exists';
            this.categoryService.errorMessage.set(message);
          }
        }
      );

      this.subscription.add(createdCategory);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
