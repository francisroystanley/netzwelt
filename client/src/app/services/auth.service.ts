import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { LOGIN_PATH } from "src/constants";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) {}

  login$(username: string, password: string) {
    const loginEndpoint = `${environment.apiUrl}/account/login`;

    return this.http
      .post<User>(loginEndpoint, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem("user", JSON.stringify(user));

          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate([LOGIN_PATH]);
  }

  refreshAccessToken$() {
    const refreshTokenEndpoint = `${environment.apiUrl}/refresh-token`;

    return this.http.post(refreshTokenEndpoint, {});
  }
}
