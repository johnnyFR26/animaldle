import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterLink } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const logdin = true

  if (!logdin) {
    router.navigateByUrl('/logIn')
    return false;
  }

  return true;
};
