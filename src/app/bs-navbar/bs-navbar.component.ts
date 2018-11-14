import { UserService } from './../user.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map,switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy{

  cart$:ShoppingCart;
  subscription:Subscription;
  displayName:string='';
  appUser:AppUser;
  constructor(private auth:AuthService,private userService:UserService,private shoppingCartService:ShoppingCartService) { 
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser = appUser;
    })
   /* auth.user$.subscribe(x=>{
      if(x!=null && x.displayName==null){
        this.userService.get(x.uid).subscribe(user =>{
          this.displayName = user.displayName;
          console.log(user);
        });
      }
      else if(x!=null){
        this.displayName = x.displayName
      }
    }); */
  }

  logout(){
    this.auth.logout();
  }

  ngOnInit(){
     this.subscription = this.shoppingCartService.getCart().subscribe(x => this. cart$ = x);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
