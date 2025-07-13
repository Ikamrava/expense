import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: Auth = inject(Auth);
  const router: Router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      // If a user is logged in, allow access
      if (user) {
        return true;
      }
      
      // If no user is logged in, redirect to the login page
      router.navigate(['/login']);
      return false;
    })
  );
};