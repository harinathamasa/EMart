import { Router } from '@angular/router';
import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  
  cart:ShoppingCart;
  isCardAvailable:boolean=false;
  subscription:Subscription;
  
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
    let cart$ = this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart =>{
      this.cart = cart
      this.isCardAvailable = true;
    } );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
