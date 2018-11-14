import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{
  products: Product[] = [];
  filteredProducts :Product[] =[];
  category:string;
  cart:any;
  subscription:Subscription;
  constructor( 
    route:ActivatedRoute,
    productService:ProductService,
    private shoppingCart: ShoppingCartService
   ) { 
    productService.getAll().subscribe(products => {
      this.products = products;
      route.queryParamMap.subscribe(params =>{
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p=> p.category === this.category):this.products;
      });
    });
  }
  ngOnInit(){
    this.subscription = this.shoppingCart.getCart()
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  

}
