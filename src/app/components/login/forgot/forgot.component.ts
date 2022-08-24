import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  userName: any;
  passWord: any;
  confirmPassWord: any;
  disabledButton: boolean = true;
  maxHeight:any = window.innerHeight - 200;
  inputFormValues:any ={};
  flagForPassWord: boolean = false;
  constructor(private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private loginService: LoginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changePassWord() {
    this.loginService.forgot(this.inputFormValues.userName, this.inputFormValues.passWord).subscribe((result) => {
      if(result){
        this.dialogRef.close();
        this.toastr.success("Successfully Passwword changed..","Forgot Password")
      }
    },
      err => {
        console.log(err.error.message);
        this.toastr.error(err.error.message,"Forgot Password")
      })
  }

  cancel() {
    this.dialogRef.close({ event: 'closeButton' });
  }
  checkPassWord(){
    if(this.inputFormValues.passWord != undefined 
      && this.inputFormValues.confirmPassWord != undefined
      && this.inputFormValues.passWord === this.inputFormValues.confirmPassWord){
        this.flagForPassWord = false
      }
      else{
        this.flagForPassWord = true;
      }
  }

}
