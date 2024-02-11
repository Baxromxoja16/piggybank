import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { MainComponent as CategoryMain } from './categories/main/main.component';
import { authGuard } from './auth/guards/auth.guard';
import { CreateAccountComponent } from './pages/card/create-account/create-account.component';
import { AccountInfoComponent } from './pages/card/account-info/account-info.component';
import { TransactionCreateComponent } from './pages/transactions/transaction-create/transaction-create.component';
import { TransactionInfoComponent } from './pages/transactions/transaction-info/transaction-info.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { CategoryInfoComponent } from './categories/category-info/category-info.component';
import { StatisticComponent } from './statistic/statistic.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: 'auth', component: LoginComponent },
  { path: 'main', canActivate: [authGuard], component: MainComponent, children: [
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'edit-account/:id', component: CreateAccountComponent },
    { path: 'account-info/:id', component: AccountInfoComponent },
    { path: 'transaction-create', component: TransactionCreateComponent },
    { path: 'transaction-info/:id', component: TransactionInfoComponent }
  ] },
  { path: 'categories', canActivate: [authGuard], component: CategoryMain, children:[
    { path: '', component: CategoryInfoComponent },
    { path: 'create-category', component: CreateCategoryComponent },
    { path: 'category-info', component: CategoryInfoComponent },
  ] },
  { path: 'statistic/:id', canActivate: [authGuard], component: StatisticComponent }

];
