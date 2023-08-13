import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthenticationService } from "../../services/auth.service";
import { BASE_PATH } from "src/constants";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  error = "";
  loading = false;
  loginForm!: FormGroup;
  submitted = false;
  loginSub!: Subscription;

  constructor(private authSrvc: AuthenticationService, private router: Router) {
    if (this.authSrvc.userValue) this.router.navigate([BASE_PATH]);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  controlHasError(name: string) {
    return (
      this.loginForm.get(name)?.invalid &&
      (this.loginForm.get(name)?.touched || this.submitted)
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.error = "";
    this.loading = true;

    this.loginSub = this.authSrvc.login$(username, password).subscribe({
      next: () => {
        this.router.navigate([BASE_PATH]);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.loginSub?.unsubscribe();
  }
}
