import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

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
  public get userName():string{
    return this._userName;
  }
  set userName(val: string){
    this._userName = val;
  }

  public get password():string{
    return this._password;
  }
  set password(val: string){
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
    this.http.post<any>(url, requestData).subscribe(data => {
        // console.log(data);

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        //redirect user to home page
        this.isUserLoggedIn.next(true);
        this.router.navigate(['home']);

        console.log('recieved response')
    })

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
}
