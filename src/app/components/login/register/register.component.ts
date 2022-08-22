import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  maxHeight:any = window.innerHeight - 200;
  userName: any;
  passWord: any;
  firstName: any;
  lastName: any;
  email: any;
  contactNo: any;
  confirmPassWord: any;
  disabledButton = true;

  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private loginService: LoginServiceService,private router:Router) { }

  ngOnInit(): void {
    console.log(this.maxHeight);
  }
  changeUserName() {
    if(this.userName != undefined && this.userName.length > 0){
      
    }

    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  changePassWord() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  changeConfirmPassWord() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    } 
  }
  changeFirstName() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  changeLastName() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  changeEmailId() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  changeCotactNo() {
    if(this.userName != undefined && this.userName.length > 0 && this.passWord!= undefined && this.passWord.length > 0 &&
      this.firstName != undefined && this.firstName.length > 0 && this.lastName!= undefined && this.lastName.length > 0 &&
      this.email != undefined && this.email.length > 0 && this.contactNo!= undefined && this.contactNo.length > 0 &&
      this.confirmPassWord != undefined && this.confirmPassWord.length > 0 && this.confirmPassWord === this.passWord ){
        
          this.disabledButton = false;
        
    }
  }
  register() {

    this.loginService.register(this.userName, this.passWord, this.firstName, this.lastName, this.email, this.contactNo).subscribe((result) => {
      if(result){
        this.dialogRef.close();
      }
    },
    err => {
      console.log(err.error.message);
    });

  }
  cancel() {
    this.dialogRef.close({ event: 'closeButton' });
  }
}
