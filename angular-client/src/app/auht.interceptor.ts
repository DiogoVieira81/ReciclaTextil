import { HttpInterceptorFn } from '@angular/common/http';

export const auhtInterceptor: HttpInterceptorFn = (req, next) => {
const jwtToken=getJwtToken();
if(jwtToken){
  var cloned=req.clone({
    setHeaders:{
      Authorization:`Bearer ${jwtToken}`,
    },
  });
  return next(cloned);
}  
return next(req);
};

function getJwtToken():string | null{
  return localStorage.getItem('JWT_TOKEN');
}