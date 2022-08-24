import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url = "http://localhost:8000/api/v1.0/tweets/";
  constructor(private http:HttpClient) { }
  
  login(inputFormValues:any):Observable<any>{
    // let query = {userName:userName,password:passWord};
    return this.http.post(this.url+"login",inputFormValues);
  }
  register(inputFormValues:any):Observable<any>{
    // let query = {userName:userName,password:password,firstName:firstName,lastName:lastName,emailId:emailId,contactNumber:contactNumber};
    return this.http.post(this.url+"register",inputFormValues);
  }
  forgot(userName:any,passWord:any):Observable<any>{
    let query = {password:passWord};
    return this.http.post(this.url+userName+"/forgot",query);
  }

  getAllUsers():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.get(this.url+"users/all",{ 'headers': headers });
  }

  getUserBySerarch(searchCriteria:any):Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*').
    set('Authorization','Bearer '+sessionStorage.getItem("TWEET_TOKEN") || "");
    return this.http.get(this.url+"user/search/"+searchCriteria,{ 'headers': headers });
  }
}
