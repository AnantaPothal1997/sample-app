import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
   console.log("user status"+this.loginService.isUserLoggedIn)

  }

 }
