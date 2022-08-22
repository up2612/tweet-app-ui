import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetServiceService {
  url = "http://localhost:8001/api/v1.0/tweets/";
  constructor(private http:HttpClient) { }

  getAllTweet(){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.get(this.url+"all",{ 'headers': headers });
  }

  addTweet(userName:any,tweetMessage:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    let query = {"tweet":tweetMessage}
    return this.http.post(this.url+userName+"/add",query,{ 'headers': headers });
  }

  updateTweet(userName:any,tweetMessage:any,tweetId:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    let query = {"tweet":tweetMessage}
    return this.http.put(this.url+userName+"/update/"+tweetId,query,{ 'headers': headers });
  }


  replyTweet(tweetId:any,userName:any,replyTweet:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    let query = {"reply":replyTweet}
    return this.http.post(this.url+userName+"/reply/"+tweetId,query,{ 'headers': headers });
  }

  deleteTweet(tweetId:any,userName:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.delete(this.url+userName+"/delete/"+tweetId,{ 'headers': headers });
  }

  likeTweet(userName:any,tweetId:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.put(this.url+userName+"/like/"+tweetId,'',{ 'headers': headers });
  }
  getUserTweet(userName:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.get(this.url+userName,{ 'headers': headers });
  }
}
