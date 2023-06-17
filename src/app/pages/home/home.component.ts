import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private loginService:LoginServiceService){

  }

  finalString = '';
  textArea = new FormControl('');
  checkLogin(){
   console.log("user status"+this.loginService.isUserLoggedIn)

  }

  checkAndAdd(){
    console.log('value changed')
    console.log(this.textArea.value)
    console.log('length is'+this.textArea.value?.length)
    if(this.textArea.value){
      //check here if the string lenght >=50 then check the last end character must be a space if not then consider the last word as a incomplete word.
      //check atleast one space is there inside the sentence.
      
        if(this.textArea.value?.length >= 50){
          if(this.textArea.value.includes(' ')){
          let sentence = this.textArea.value.substring(0,50);
          if (!sentence.endsWith(' ')) {
            let lastSpaceIndex = sentence.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
              sentence =  sentence.substring(0, lastSpaceIndex+1);
            }
          }
          console.log(sentence);
          sentence =  sentence.replace(/(\r\n|\n|\r)/gm, "<br>");

          let lineBreakRegex = /[\r\n]/;
          if(lineBreakRegex.test(sentence)){
            console.log('line break character present');
          }else{
            console.log('not present')
          }

          this.finalString += sentence
          console.log(this.finalString)
          this.textArea.reset();
        }else{
          //clear the field but not added anything to the mainString
          this.textArea.reset();
        }
        }
      
    
    }
   
  }

 }
