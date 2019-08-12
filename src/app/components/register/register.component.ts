import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  errors = [];

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show("Please fill in all values", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      return false;
    } else {
      // validate email
      if (!this.validateService.validateEmail(user.email)) {
        this.flashMessagesService.show("Please provide a valid email", {
          cssClass: "alert-danger",
          timeout: 4000
        });
        return false;
      }
      // confirm password
      if (!this.validateService.validatePassword(user)) {
        this.flashMessagesService.show("Confirm password did not match", {
          cssClass: "alert-danger",
          timeout: 4000
        });
        return false;
      }
      // Register User
      else {
        this.authService.registerUser(user).subscribe(
          data => {
            console.log(data);
            this.flashMessagesService.show((data as any).message, {
              cssClass: "alert-success",
              timout: 4000
            });
            this.router.navigate(["/login"]);
          },
          error => {
            console.log(error);
            this.flashMessagesService.show((error as any).error.message, {
              cssClass: "alert-danger",
              timout: 4000
            });
            // place individual errors into errors array
            this.errors = error.error.errors;
            // send each error
            this.router.navigate(["/register"]);
          }
        );
      }
    }
  }
}
