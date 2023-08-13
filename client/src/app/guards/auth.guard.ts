import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";

import { AuthenticationService } from "../services/auth.service";
import { LOGIN_PATH } from "src/constants";

export const AuthGuard: CanActivateFn = () => {
  const authSrvc = inject(AuthenticationService);
  const router = inject(Router);
  const user = authSrvc.userValue;

  if (user) return true;

  router.navigate([LOGIN_PATH]);

  return false;
};
