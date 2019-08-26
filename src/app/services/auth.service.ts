import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
// import { tokenNotExpired, JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;
  // url = "http://lara-jwt.com/api/auth";
  url = "http://lara-pass.com/api/auth";
  // url = "http://localhost:5000/api/auth";
  // url = "api/auth";

  constructor(private http: HttpClient) {}

  // POST | api/users/register
  // register user
  registerUser(user) {
    let headers = new HttpHeaders();
    // HttpHeaders.
    headers.append("Content-type", "application/json");
    return this.http.post(this.url + "/register", user, {
      headers
    });
  }

  // POST | api/users/login
  // authenticate/login user
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    return this.http.post(this.url + "/login", user, {
      headers
    });
  }

  // store access_token into local storage
  setToken(access_token) {
    localStorage.setItem("access_token", access_token);
    this.authToken = access_token;
    console.log(this.isValidToken());
  }

  getToken() {
    // const access_token = localStorage.getItem("access_token");
    // this.authToken = access_token;
    return localStorage.getItem("access_token");
  }

  removeToken() {
    localStorage.removeItem("access_token");
  }

  isValidToken() {
    // const access_token = this.getToken();
    // if (access_token) {
    //   const payload = this.payload(access_token);
    //   if (payload) {
    //     return payload.iss == this.url + "/login" ? true : false;
    //     // console.log(payload.iss);
    //   }
    // }
    
    const access_token = this.getToken();
    if (access_token) {
      return true
    } else {
      return false
    }
  }

  // get the payload(middle of the JWT). JWT has 3 parts. We only need to grab the middle part
  payload(access_token) {
    const payload = access_token.split(".")[1];
    return this.decode(payload);
  }

  // decode the payload
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  isLoggedIn() {
    return this.isValidToken();
  }

  currentUser() {
    const access_token = this.getToken();
    if (access_token) {
      const payload = this.payload(access_token);
      if (payload) {
        return payload;
      }
    }
  }

  // signout
  logout() {
    return localStorage.removeItem("access_token");
    // FUCK IT. Can't seem to send the access_token(Authorization) to backend. FUUUCK!
    // const access_token = this.getToken();
    // let headers = new HttpHeaders({
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${access_token}`
    // });

    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('enctype', 'multipart/form-data');
    // headers = headers.append('Accept', 'application/json');
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    // headers = headers.append('Authorization', `Bearer ${access_token}`);

    // console.log(access_token);
    // console.log(headers);
    // return this.http.post(this.url + "/logout", headers);
  }
}
