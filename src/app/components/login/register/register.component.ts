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
  flagForPassWord: boolean = false;
  inputFormValues:any ={};

  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private loginService: LoginServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {

    this.loginService.register(this.inputFormValues).subscribe((result) => {
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

  checkPassWord(){
    if(this.inputFormValues.password != undefined 
      && this.inputFormValues.confirmPassWord != undefined
      && this.inputFormValues.password === this.inputFormValues.confirmPassWord){
        this.flagForPassWord = false
      }
      else{
        this.flagForPassWord = true;
      }
  }
}
