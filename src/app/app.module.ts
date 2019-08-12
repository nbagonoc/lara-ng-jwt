import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FlashMessagesModule } from "angular2-flash-messages";

// SERVICES
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";

// GUARDS
import { UserGuard } from "./guards/user.guard";
import { ClientGuard } from "./guards/client.guard";
import { AdminGuard } from "./guards/admin.guard";

// COMPONENTS
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { SubscriberComponent } from "./components/subscriber/subscriber.component";
import { UpdateComponent } from "./components/profile/update/update.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { GetUserComponent } from "./components/admin/users/get-user/get-user.component";
import { UpdateUserComponent } from "./components/admin/users/update-user/update-user.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

// ROUTES
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [ClientGuard]
  },
  { path: "login", component: LoginComponent, canActivate: [ClientGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [UserGuard]
  },
  { path: "profile", component: ProfileComponent, canActivate: [UserGuard] },
  {
    path: "profile/update/:id",
    component: UpdateComponent,
    canActivate: [UserGuard]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [UserGuard, AdminGuard]
  },
  {
    path: "admin/users",
    component: UsersComponent,
    canActivate: [UserGuard, AdminGuard]
  },
  {
    path: "admin/users/get/:id",
    component: GetUserComponent,
    canActivate: [UserGuard, AdminGuard]
  },
  {
    path: "admin/users/update/:id",
    component: UpdateUserComponent,
    canActivate: [UserGuard, AdminGuard]
  },
  {
    path: "subscriber",
    component: SubscriberComponent,
    canActivate: [UserGuard]
  },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AdminComponent,
    SubscriberComponent,
    UpdateComponent,
    UsersComponent,
    GetUserComponent,
    UpdateUserComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    UsersService,
    UserGuard,
    ClientGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
