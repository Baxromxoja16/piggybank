import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('tokenUser')!;
  if(token) return true;
  else return false;
};
