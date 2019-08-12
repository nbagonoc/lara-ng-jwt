import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  authToken: any;
  user: any;
  url = "http://lara-jwt.com/api/auth";
  // url = "http://localhost:5000/api/users";
  // url = "api/auth";

  constructor(private http: HttpClient) {}

  getToken() {
    // const token = localStorage.getItem("access_token");
    // this.authToken = token;
    return localStorage.getItem("access_token");
  }

  // CRUD USER

  // POST | api/users/profile
  // view current user for profile
  viewUser() {
    const access_token = this.getToken();

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    });

    return this.http.post(this.url + "/me", {
      headers
    });
  }

  // GET | api/users
  // view users
  viewUsers() {
    this.getToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.url, {
      headers
    });
  }

  // GET | api/users/show/:id
  // get a user
  getUser(id) {
    this.getToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get(this.url + "/show/" + id, {
      headers
    });
  }

  // PUT | api/users/update (NEED TO REFACTOR THIS AGAIN)
  // update user
  updateUser(user) {
    this.getToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.put(this.url + "/update/" + user._id, user, {
      headers
    });
  }

  // DELETE | api/users/delete/:id
  // delete user
  deleteUser(id) {
    this.getToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.delete(this.url + "/delete/" + id, {
      headers
    });
  }
}
