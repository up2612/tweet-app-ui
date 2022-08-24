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
  inputFormValues:any ={};
  constructor(public dialog: MatDialog,
    private loginService: LoginServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.destroySessionStorage();
  }

  login() {
    this.loginService.login(this.inputFormValues).subscribe((result) => {
      console.log(this.inputFormValues);
      if (result) {
        sessionStorage.setItem("TWEET_TOKEN", result.token);
        sessionStorage.setItem("USERNAME", this.inputFormValues.userName);
        this.toastr.success("Successfully Login", "Login");
        this.router.navigate(['tweet-app']);
      }

    },
      err => {
        this.toastr.error(err.error.message, "Login");
      });
  }
  forgot() {

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
    sessionStorage.clear();
  }
}
