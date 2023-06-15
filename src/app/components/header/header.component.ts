import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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

}
