import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faComment, faCommentDots, faCommenting, faHeart, faPenToSquare, faReply, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { TweetServiceService } from 'src/app/services/tweet-service.service';

@Component({
  selector: 'app-tweet-app',
  templateUrl: './tweet-app.component.html',
  styleUrls: ['./tweet-app.component.scss']
})
export class TweetAppComponent implements OnInit {
  userName: any;
  disableButton: boolean = true;
  disableButtonReplyTweet: boolean = true;
  invalidAddTweet:boolean = false;
  invalidReplyTweet:boolean = false;
  invalidEditTweet:boolean = false;
  addTweetMessage: any;
  allTweet: any;
  replayTweetMessage: any;
  editIcon = faPenToSquare;
  replyIcon = faCommentDots;
  likeIcon = faHeart;
  deleteIcon = faTrash;
  profileIcon = faUser;
  items: string[] = [];
  anotherTweetBool: boolean = false;
  anotherTweetUsername:any;
  constructor(private tweetService: TweetServiceService,
    private toastr: ToastrService,
    private loginService: LoginServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem("USERNAME");
    this.anotherTweetUsername = sessionStorage.getItem("ANOTHERTWEETUSERNAME")
    this.anotherTweetBool = sessionStorage.getItem("ANOTHERTWEETBOOL") === 'Y' ? true : false;

    this.getAllTweet();
    this.getAllUsers();
  }
  getAllTweet() {
    if (sessionStorage.getItem("MYTWEETBOOL") === 'Y' ? true : false) {
      this.tweetService.getUserTweet(this.userName).subscribe((result) => {
        this.allTweet = result;
        this.allTweet = this.allTweet.reverse();
        this.manipulationTweet();
      });
    }
    else if (sessionStorage.getItem("ANOTHERTWEETBOOL") === 'Y' ? true : false) {
      this.tweetService.getUserTweet(sessionStorage.getItem("ANOTHERTWEETUSERNAME")).subscribe((result) => {
        this.allTweet = result;
        this.allTweet = this.allTweet.reverse();
        this.manipulationTweet();
      });
    }
    else {
      this.tweetService.getAllTweet().subscribe((result) => {
        this.allTweet = result;
        this.allTweet = this.allTweet.reverse();
        this.manipulationTweet();
      },
        err => {
          this.toastr.error(err.error.message, "Tweet");
          this.destroySessionStorage();
          this.router.navigate(['login']);
        });
    }


  }
  manipulationTweet() {
    for (let i = 0; i < this.allTweet.length; i++) {
      let count = 0;
      this.allTweet[i].myLike = false;
      for (let j = 0; j < this.allTweet[i].likes.length; j++) {
        if (this.allTweet[i].likes[j] === this.userName) {
          this.allTweet[i].myLike = true;
        }
        ++count;
      }
      this.allTweet[i].likeCount = count;
    }
  }
  onchangeTweet() {
    if (this.addTweetMessage != undefined && this.addTweetMessage != null 
      && this.addTweetMessage.length > 0) {
      this.disableButton = false;
    }
    else{
      this.disableButton = true;
    }
  }

  addTweet() {
    // 144 char
    console.log(this.addTweetMessage);
    this.tweetService.addTweet(this.userName, this.addTweetMessage).subscribe((result) => {
      if (result.code === 200) {
        this.addTweetMessage = undefined;
        this.disableButton = true;
        this.toastr.success(result.message, "Tweet");
        this.getAllTweet();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });
  }

  replyToTweet(tweet: any) {
    tweet.takeReplyBool = true;
  }

  replyTweet(tweet: any) {

    this.tweetService.replyTweet(tweet.tweetId, this.userName, this.replayTweetMessage).subscribe((result) => {
      this.replayTweetMessage = undefined;
      console.log(result);
      if (result.code === 200) {
        this.toastr.success(result.message, "Tweet");
        this.getAllTweet();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });

  }
  deleteTweet(tweet: any) {
    this.tweetService.deleteTweet(tweet.tweetId, this.userName).subscribe((result) => {
      if (result.code === 200) {
        this.toastr.success(result.message, "Tweet");
        console.log(result);
        this.getAllTweet();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });
  }

  editTweet(tweet: any) {
    tweet.editTweetBool = true;
  }
  updateTweet(tweet: any) {
    console.log(tweet);
    this.tweetService.updateTweet(this.userName, tweet.tweet, tweet.tweetId).subscribe((result) => {
      if (result.code === 200) {
        this.toastr.success(result.message, "Tweet");
        this.getAllTweet();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });
  }
  likeTweet(tweet: any) {
    this.tweetService.likeTweet(this.userName, tweet.tweetId).subscribe((result) => {
      if (result.code === 200) {
        this.toastr.success(result.message, "Tweet");
        this.getAllTweet();
      }
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });
  }

  getAllUsers() {
    this.loginService.getAllUsers().subscribe((result) => {
      this.items = result;
    },
      err => {
        this.toastr.error(err.error.message, "Tweet");
        this.destroySessionStorage();
        this.router.navigate(['login']);
      });
  }

  destroySessionStorage() {
    sessionStorage.clear();
  }

  checkTweet(){
    if(this.addTweetMessage.length >= 144){
      this.invalidAddTweet = true;
    }
    else{
      this.invalidAddTweet = false;
    }
    this.onchangeTweet();
  }

  checkTweetReply(tweet:any){
    if(this.replayTweetMessage.length >= 144){
      tweet.invalidReplyTweet = true;
    }
    else{
      tweet.invalidReplyTweet = false;
    }
  }

  checkTweetEdit(tweet:any){
    console.log(tweet);
    if(tweet.tweet.length >= 144){
      tweet.invalidEditTweet = true;
    }
    else{
      tweet.invalidEditTweet = false;
    }
  }
}
