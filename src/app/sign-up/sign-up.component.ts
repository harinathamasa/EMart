import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  successMsg:string;
  isSuccess:boolean;
  errorMsg:string;
  constructor(private route:Router,private userService:UserService) { }

  ngOnInit() {
  }
/*
  submit(user){
    this.userService.register(user).then(res=>{
      console.log(res);
      this.successMsg = 'User registration successful';
      this.isSuccess = true;
      setTimeout(()=>{
        this.route.navigate(['/login']);
      },3000);
    },err=>{
      this.errorMsg = 'User registration failed';
    });
  }
*/

submit(user){
  console.log(user);
  this.userService.createLogin(user).then(res=>{
    console.log(res);
    this.successMsg = 'User registration successful';
    this.isSuccess = true;
    setTimeout(()=>{
      this.route.navigate(['/']);
    },3000);
  },err=>{
    console.log('signup error');
    this.errorMsg = 'User registration failed';
  });
}


  cancel(){
    this.route.navigate(['/']);
  }

}
