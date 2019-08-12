import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // redirect user, since already logged-in
      this.router.navigate(["/dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}
