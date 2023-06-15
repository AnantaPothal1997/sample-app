import { Component } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private loginService:LoginServiceService){

  }

  checkLogin(){
    this.loginService.isLoggedIn();

  }

}
