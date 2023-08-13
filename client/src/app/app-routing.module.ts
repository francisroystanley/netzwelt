import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent, LoginComponent } from "./components";
import { AuthGuard } from "./guards/auth.guard";
import { HOME_PATH } from "src/constants";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "account/login", component: LoginComponent },
  { path: "", redirectTo: HOME_PATH, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
