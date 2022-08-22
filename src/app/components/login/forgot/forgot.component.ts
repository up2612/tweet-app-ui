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
  constructor(private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private loginService: LoginServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onChangeAttr() {
    if (this.userName != undefined && this.userName.length > 0 
      && this.passWord != undefined && this.passWord.length > 0 
      && this.confirmPassWord != undefined && this.confirmPassWord.length > 0 
      && this.confirmPassWord === this.passWord) {
        this.disabledButton = false;
    }
  }

  changePassWord() {
    this.loginService.forgot(this.userName, this.passWord).subscribe((result) => {
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

}
