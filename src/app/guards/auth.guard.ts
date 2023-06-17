// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   let userLoginStatus = localStorage.getItem("userLoginStatus");
//   console.log(route)
//   return userLoginStatus == "1" ? true : false;
// };

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  loginStatus = false;
  constructor(private loginService: LoginServiceService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.loginService.isUserLoggedIn.subscribe(data=> {
      console.log("login status is"+data)
      this.loginStatus = data;
    });

    if (!this.loginStatus) {
      this.router.navigate(['login']);
    }
    return true;
  }
}