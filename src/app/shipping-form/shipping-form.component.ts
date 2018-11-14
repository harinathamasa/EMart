import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/shopping-cart';
import { Order } from './../models/order';
import { ShoppingCartService } from './../shopping-cart.service';
import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Input('cart') cart:ShoppingCart;
  shipping = {
    "name":"",
    "line1":"",
    "line2":"",
    "city":""
  };
  userId:string;
  userSubscription:Subscription;
  constructor(
    private router:Router,
    private authService:AuthService,
    private orderService:OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder(){
    let order = new Order(this.userId,this.shipping,this.cart);
    console.log(order);
    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
