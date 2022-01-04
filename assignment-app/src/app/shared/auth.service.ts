import { PortalModule } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = true;

  logIn() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn)
      }
    );

    return isUserAdmin;
  }

  constructor() { }
}
