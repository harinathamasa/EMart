import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {

  cart:ShoppingCart;
  subscription : Subscription;
  isLoading:boolean=false;
  constructor(private cartService:ShoppingCartService) { }

  ngOnInit() {
    this.subscription = this.cartService.getCart().subscribe(x=>{
      this.cart = x;
      this.isLoading = true;
    });
    console.log(this.cart);
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
  clearCart(){
    this.cartService.clearCart();
  }
  

}
