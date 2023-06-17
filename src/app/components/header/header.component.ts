import { Component } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private loginService:LoginServiceService){}

  myFunction() {
    console.log('hello')
    let x = document.getElementById("myTopnav");
    if (x?.className === "topnav") {
      x.className += " responsive";
    } else {
      if(x?.className)
        x.className = "topnav";
    }
  }

  logout(){
    console.log("logout works")
    this.loginService.logoutProcess();
  }

}
