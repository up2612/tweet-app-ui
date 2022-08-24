import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { ForgotComponent } from '../login/forgot/forgot.component';
import { RegisterComponent } from '../login/register/register.component';

@Component({
  selector: 'app-tweet-app-headerbar',
  templateUrl: './tweet-app-headerbar.component.html',
  styleUrls: ['./tweet-app-headerbar.component.scss']
})
export class TweetAppHeaderbarComponent implements OnInit {
  flagForTweet: boolean = false;
  flagForLogin: boolean = true;
  searchUname: any;
  searchResult: any;
  myTweetBool: boolean = false;
  filteredOptions: string[] = [];
  searchOption: any = '';

  constructor(public dialog: MatDialog,
    private loginService: LoginServiceService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("TWEET_TOKEN"));
    if (sessionStorage.getItem("TWEET_TOKEN")) {
      this.flagForTweet = true;
      this.flagForLogin = false;
    }
    else {
      this.flagForTweet = false;
      this.flagForLogin = true;
    }
  }
  ngOnChanges() {
    console.log(sessionStorage.getItem("TWEET_TOKEN"));
    if (sessionStorage.getItem("TWEET_TOKEN")) {
      this.flagForTweet = true;
      this.flagForLogin = false;
    }
    else {
      this.flagForTweet = false;
      this.flagForLogin = true;
    }
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
  logout() {
    this.destroySessionStorage();
  }

  searchUsername() {
    this.loginService.getUserBySerarch(this.searchUname).subscribe((result) => {
      this.searchResult = result;
    },
      err => {
        this.searchResult = [];
        if (err.errror.message === "Login Expired") {
          sessionStorage.removeItem("TWEET_TOKEN");
          sessionStorage.removeItem("USERNAME");
          this.router.navigate(['login']);
        }
      })
  }
  myTweet() {
    this.myTweetBool = true;
    sessionStorage.setItem("MYTWEETBOOL", this.myTweetBool ? 'Y' : 'N');
    sessionStorage.removeItem("ANOTHERTWEETBOOL");
    sessionStorage.removeItem("ANOTHERTWEETUSERNAME");
  }
  homeClick() {
    sessionStorage.removeItem("MYTWEETBOOL");
    sessionStorage.removeItem("ANOTHERTWEETBOOL");
    sessionStorage.removeItem("ANOTHERTWEETUSERNAME");
  }
  onClickOption(result: any) {
    sessionStorage.removeItem("MYTWEETBOOL");
    sessionStorage.setItem("ANOTHERTWEETBOOL", 'Y');
    sessionStorage.setItem("ANOTHERTWEETUSERNAME", result);
  }

  filter() {
    const filterValue = this.searchOption.toLowerCase();
    if (this.searchOption) {
      this.loginService.getUserBySerarch(this.searchOption).subscribe((option) => {

        this.filteredOptions = option;
      },
        err => {
          this.destroySessionStorage();
          this.router.navigate(['login']);
        });
    } else {
      this.filteredOptions = [];
    }

  }

  destroySessionStorage() {
    sessionStorage.clear();
  }
}
