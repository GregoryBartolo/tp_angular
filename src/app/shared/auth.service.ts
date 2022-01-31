import { PortalModule } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../assignments/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //application/x-www-form-urlencoded
    })
  };

  constructor(private http:HttpClient) { }

  loggedIn = false;
  url = "https://tp-angular-buffa-api.herokuapp.com/api/auth";

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(this.url + "/login", {email, password}, this.HttpOptions);
  }

  activeLogin() {
    this.loggedIn = true;
  }

  logOut(): Observable<any> {
    return this.http.get(this.url + "/logout");
  }

  activeLogout() {
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

  registerIn(name: string, email: string, password: string): Observable<any> {
    return this.http.post(this.url + "/register", {name, email, password}, this.HttpOptions);
  }

  private handleError<T>(operation:any, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  }

}
