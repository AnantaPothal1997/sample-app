import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private _userName = ''; //keep as private variable
  private _password = '';

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
        this.router.navigate(['home']);

        console.log('recieved response')
    })

  }

  isLoggedIn(){
    let url = "https://api.escuelajs.co/api/v1/auth/profile";
    let accesToken = localStorage.getItem('access_token');
    console.log(accesToken);
    let headers = { 'Authorization': `Bearer ${accesToken}`}
    this.http.get<any>(url, { headers }).subscribe({
      next: data => {
          console.log("user validated")
      },
      error: error => {
          //logut an user if the token is not valid or any error redirect to login page
          //clear local storage
          localStorage.clear();
          this.router.navigate(['login']);
      }
  })
  }
}
