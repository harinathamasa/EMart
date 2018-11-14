import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { CategoryService } from './../category.service';
import { Product } from './../models/product';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('show-actions')showActions = true;
  @Input('shopping-cart') shoppingCart:ShoppingCart;
  constructor(private cartService:ShoppingCartService) { }
  
  addTocart(){
    this.cartService.addToCart(this.product);
  }


}
