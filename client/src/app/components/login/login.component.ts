import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  error = "";
  loading = false;
  loginForm!: FormGroup;
  submitted = false;

  constructor(private router: Router) {}

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

    this.error = "";
    this.loading = true;

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 1000);
  }
}
