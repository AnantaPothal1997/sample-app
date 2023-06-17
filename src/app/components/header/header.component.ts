import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;

  dropdownOpen = false;
  constructor(private loginService:LoginServiceService){}
  ngOnInit() {
    this.setupDropdownMenu();
  }

  setupDropdownMenu() {
    // Prevent closing from click inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach((element) => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // Make it as accordion for smaller screens
    if (window.innerWidth < 992) {
      // Close all inner dropdowns when parent is closed
      document.querySelectorAll('.navbar .dropdown').forEach((everydropdown) => {
        everydropdown.addEventListener('hidden.bs.dropdown', () => {
          // After dropdown is hidden, then find all submenus
          everydropdown.querySelectorAll('.submenu').forEach((everysubmenu) => {
            // Hide every submenu as well
            (everysubmenu as HTMLElement).style.display = 'none';
          });
        });
      });

      document.querySelectorAll('.dropdown-menu a').forEach((element) => {
        element.addEventListener('click', (e) => {
          let nextEl = (element as HTMLElement).nextElementSibling;
          if (nextEl && nextEl.classList.contains('submenu')) {
            // Prevent opening link if link needs to open dropdown
            e.preventDefault();
            console.log(nextEl);
            if ((nextEl as HTMLElement).style.display == 'block') {
              (nextEl as HTMLElement).style.display = 'none';
            } else {
              (nextEl as HTMLElement).style.display = 'block';
            }
          }
        });
      });
    }
  }

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


  openDropdown() {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
