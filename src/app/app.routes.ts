import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { authGuard } from './auth/guards/auth.guard';
import { CreateAccountComponent } from './pages/components/create-account/create-account.component';
import { AccountInfoComponent } from './pages/components/account-info/account-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: 'auth', component: LoginComponent },
  { path: 'main', canActivate: [authGuard], component: MainComponent, children: [
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'account-info', component: AccountInfoComponent }
  ] },

];
