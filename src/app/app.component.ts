import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './services/login-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sample-app';
  showHeaderFooter = false;

  constructor(private loginService: LoginServiceService){

  }
  async ngOnInit() {
   //check user login status
   await this.loginService.isLoggedIn();
   this.loginService.isUserLoggedIn.subscribe(data=>{
    console.log("recieve data:"+data);
    this.showHeaderFooter = true;
   });
  }

}
