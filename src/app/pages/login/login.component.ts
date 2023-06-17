import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]) 
  })

  userLoginStatus = false;
  showLoader:boolean = false;
  credentialWrong:boolean = false;
  messageToShow:string = ''
  

  constructor(public loginService:LoginServiceService, private route:Router) { 

  }

  //check the user login status
  ngOnInit() {
    this.detectChanges();
    this.loginService.isUserLoggedIn.subscribe(data=>{
      this.userLoginStatus = data;
      if(this.userLoginStatus){
        //redirect to home page
        this.route.navigate(['home']);
      }
    })
  }

  detectChanges() {
    this.loginForm.valueChanges.subscribe(res => {
      // clear the error if have
      this.credentialWrong = false;
      
    });
  }

  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  userLogin(){
    console.log(this.loginForm.value);
    this.showLoader = true;

    this.loginService.userName = this.loginForm.value.email;
    this.loginService.password = this.loginForm.value.password;

    this.loginService.userLogin().subscribe(
      (data)=>{
        console.log(data);
        this.showLoader = false;
  
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
  
        //redirect user to home page
        this.loginService.isUserLoggedIn.next(true);
        this.route.navigate(['home']);
  
        console.log('recieved response')
      },
      (error)=>{
        this.showLoader = false;
        this.credentialWrong = true;
        if (error.status === 0) {
          // Handle 404 error
          this.messageToShow = "Check your internet connection!";
          // console.log('Check your internet connection');
        } else {
          // user credential is wrong
          this.messageToShow = "Wrong credential!";
          // console.log('An error occurred:', error);

        }
      }
     )
  }

  changeBoarder(fieldName:string){
    if(fieldName == 'email'){
      if(this.email?.invalid && this.email.touched)
       return {border:'1px solid red'}
    }

    if(fieldName == 'password'){
      if(this.password?.invalid && this.password.touched)
       return {border:'1px solid red'}
    }
    return {}
  }

}
