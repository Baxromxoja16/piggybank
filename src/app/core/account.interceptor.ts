import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const accountInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('tokenUser')!;
  const authReq = req.clone({
    headers: req.headers.set('Authorization', JSON.stringify(token))
  })
  //clone request and change header
  return next(authReq);
};
