import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName = new FormControl('');
  password = new FormControl('');

  constructor(public loginService:LoginServiceService) { 

  }
  userLogin(){
   
    this.loginService.userName = this.userName.value === null ? "": this.userName.value;
    this.loginService.password = this.password.value === null ? "": this.password.value;
    this.loginService.userLogin();
  }

}
