import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('tokenUser')!;
    if (token) return true;
    else return false;
  }
  return false;
};
