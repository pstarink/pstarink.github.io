import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const token: any = jwt_decode(profile.token);
      const now = Date.now() / 1000;
      if (token.exp > now) {
        console.log(`Auth for ${state.url} passed`)
        return true;
      }
    } catch {
      // swallow exception
    }

    // not logged in, or expired token - redirect to login page with return url
    console.log("Not logged in, redirect to login")
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
