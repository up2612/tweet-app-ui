import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  maxHeight: any = window.innerHeight - 200;
  userName: any;
  passWord: any;
  firstName: any;
  lastName: any;
  email: any;
  contactNo: any;
  confirmPassWord: any;
  disabledButton = true;
  inValidEmail:boolean = false;
  inValidPhone: boolean = false;

  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private loginService: LoginServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  changeFunction() {
    if (this.userName != undefined && this.userName.length > 0 && this.passWord != undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName != undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo != undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord && !this.inValidPhone && !this.inValidEmail) {

      this.disabledButton = false;

    }
  }
  register() {

    this.loginService.register(this.userName, this.passWord, this.firstName, this.lastName, this.email, this.contactNo).subscribe((result) => {
      if (result) {
        this.toastr.success("Successfully Registered", "Register");
        this.dialogRef.close();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Register");
      });

  }
  cancel() {
    this.dialogRef.close({ event: 'closeButton' });
  }

  checkEmail(){
    var patt = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$");
    var res = patt.test(this.email);
    if(res){
    this.inValidEmail = false;
    }
    else{
      this.inValidEmail = true;
    }
    this.changeFunction();
  }
  checkPhone(){
    var patt = new RegExp("^[1-9][0-9]{9}");
    var res = patt.test(this.contactNo);
    if(res){
    this.inValidPhone = false;
    }
    else{
      this.inValidPhone = true;
    }
    this.changeFunction();
  }
}
