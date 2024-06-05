import { inject } from '@angular/core';
import { CanActivateFn, RouteReuseStrategy, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 let authService=inject(AuthService);
 let routerService=inject(Router);
 if(!authService.isLoggedIn()){
  alert('Precisa fazer LOGIN para aceder a pagina!');
routerService.navigate(['/login']);
return false;
}
  return true;
};
