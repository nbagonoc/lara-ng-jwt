import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user: object;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logout()
    this.router.navigate(["/"]);

    // this.authService.logout().subscribe(
    //   data => {
    //     console.log(data);
    //     // this.authService.setToken(
    //     //   (data as any).access_token
    //     // );
    //     // this.router.navigate(["/"]);
    //   },
    //   error => {
    //     console.log(error);
    //     // this.router.navigate(["login"]);
    //   }
    // );
  }
}
