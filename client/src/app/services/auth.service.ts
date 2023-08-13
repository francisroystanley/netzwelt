import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { LOGIN_PATH } from "src/constants";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem("user")!)
    );
    this.user = this.userSubject.asObservable();
  }

  clearSession() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
    this.router.navigate([LOGIN_PATH]);
  }

  login$(username: string, password: string) {
    return this.http
      .post<User>("/api/account/login", {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          this.userSubject.next(user);

          return user;
        })
      );
  }

  logout$() {
    return this.http
      .post<User>("/api/account/logout", {})
      .pipe(map(() => this.clearSession()));
  }

  refreshAccessToken$() {
    return this.http.post("/api/refresh-token", {});
  }

  get userValue() {
    return this.userSubject.value;
  }
}
