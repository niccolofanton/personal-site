import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { }

  /** check if users is authenticated */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isAuthenticated()) {
      return true;
    }

    this._router.navigate(['/login']);
    return false;

  }

  /**
   * check user in memory and send it to the right place
   * @returns route to navigate to
   */
  // const _user = await this._authService.user$
  //   .pipe(filter(user => user !== null))
  //   .pipe(first())
  //   .toPromise()
  //   .catch(() => false);

}
