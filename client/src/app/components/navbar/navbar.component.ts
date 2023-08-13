import { Component } from "@angular/core";

import { AuthenticationService } from "src/app/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  isCollapsed = true;
  user?: User | null;

  constructor(private authSrvc: AuthenticationService) {
    this.authSrvc.user.subscribe((user) => (this.user = user));
  }

  onLogout() {
    this.authSrvc.logout();
  }
}
