import { inject } from "@angular/core";
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);
  if (authService.user().user !== undefined) {
    router.navigateByUrl("/login");
    return true;
  } else {
    return false;
  }
};
