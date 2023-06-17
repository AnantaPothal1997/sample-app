import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private _userName = ''; //keep as private variable
  private _password = '';

  // isUserLoggedIn:boolean = false;
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private http: HttpClient, private router: Router) { }

  //use getter and setter to set the value
  public get userName():any{
    return this._userName;
  }
  set userName(val: any){
    this._userName = val;
  }

  public get password():any{
    return this._password;
  }
  set password(val: any){
    this._password = val;
  }




  userLogin(){
    console.log("user name is"+this.userName);
    console.log("password is"+this.password);
    let url = "https://api.escuelajs.co/api/v1/auth/login";
    let requestData = {
        "email": this.userName,
        "password": this.password
    }
    return this.http.post<any>(url, requestData);

  }

  private handleError(error: HttpErrorResponse) {
    console.log('control here')
    return throwError(() => new Error('Something bad happened; please try again'));
  }



  async isLoggedIn(){
    let url = "https://api.escuelajs.co/api/v1/auth/profile";
    let accesToken = localStorage.getItem('access_token');

    if(accesToken === null || accesToken == ''){
      console.log("1")
      this.isUserLoggedIn.next(false);
      return;
    }else{
      // validate token
      let headers = { 'Authorization': `Bearer ${accesToken}`}
      await lastValueFrom(this.http.get<any>(url, { headers })).catch(err=>{
        console.log("2")
        this.isUserLoggedIn.next(false);
        return;
      })
    }
    //valid user login
    console.log("3")
    this.isUserLoggedIn.next(true);
  }

  logoutProcess(){
    console.log("logitre")
    localStorage.clear();
    this.router.navigate(['login'])
    this.isUserLoggedIn.next(false);
  }
}
