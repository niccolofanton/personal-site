import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  public user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.user$.next(this.getUserFromMemory());
  }

  /** get user token */
  public getToken(): string {
    return this.user$ && this.user$.value ? this.user$.value.token : null;
  }

  /**
   * get save user
   * @returns user or false if not found
   */
  public getUserFromMemory(): any | boolean {
    const _saveUser = localStorage.getItem('savedUser');
    if (_saveUser) { return JSON.parse(_saveUser); }
    else { return false; }
  }

  /**
   * set current user
   * @param {any} user 
   * @param {Boolean} [saveToMemory=false] save user in local storage 
   */
  public setUser(user: any, saveToMemory: boolean = false): void {
    this.user$.next(user);
    if (saveToMemory) { localStorage.setItem('savedUser', JSON.stringify(user)); }
  }

  /**
   * check if user is authenticated
   * @returns {boolean} 
   */
  public isAuthenticated(): boolean {
    if (this.user$.value) { return true; }
    else { return false; }
  }

  /** user logout */
  public logout(): void {
    localStorage.removeItem('savedUser');
    this.user$.next(null);
  }

}
