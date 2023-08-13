import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  HomeComponent,
  LoginComponent,
  NavbarComponent,
  NotFoundComponent,
  TerritoryComponent,
  TerritoryListComponent,
} from "./components";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TerritoryListComponent,
    TerritoryComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCollapseModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
