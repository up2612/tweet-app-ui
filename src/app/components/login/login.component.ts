import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: any;
  passWord: any;
  disableButton: boolean = true;
  constructor(public dialog: MatDialog,
    private loginService: LoginServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.destroySessionStorage();
  }

  onchangeUserName() {
    if (this.userName != undefined && this.userName.length > 0 && this.userName != null && this.userName != ""
      && this.passWord != undefined && this.passWord.length > 0 && this.passWord != null && this.passWord != "") {
      this.disableButton = false;
    }
    else {
      this.disableButton = true;
    }
  }
  onchangePassWord() {
    if (this.userName != undefined && this.userName.length > 0 && this.userName != null && this.userName != ""
      && this.passWord != undefined && this.passWord.length > 0 && this.passWord != null && this.passWord != "") {
      this.disableButton = false;
    }
    else {
      this.disableButton = true;
    }
  }
  login() {
    this.loginService.login(this.userName, this.passWord).subscribe((result) => {

      if (result) {
        sessionStorage.setItem("TWEET_TOKEN", result.token);
        sessionStorage.setItem("USERNAME", this.userName);
        this.toastr.success("Successfully Login", "Login");
        this.router.navigate(['tweet-app']);
      }

    },
      err => {
        this.toastr.error(err.error.message, "Login");
      });
  }
  forgot() {
    console.log("Clicked..")
    const dialogRef = this.dialog.open(ForgotComponent, {
      width: '35rem',
      panelClass: 'import-dialog-container',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  register() {
    console.log("Clicked..")
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '35rem',
      panelClass: 'import-dialog-container',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }
  destroySessionStorage() {
    sessionStorage.removeItem("TWEET_TOKEN");
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("MYTWEETBOOL");
    sessionStorage.removeItem("ANOTHERTWEETBOOL");
    sessionStorage.removeItem("ANOTHERTWEETUSERNAME");
  }
}
