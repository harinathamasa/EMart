import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  getCart():Observable<ShoppingCart> {
    let cartId = this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .pipe(map(x =>  new ShoppingCart(x.items)));
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
    this.create().then(result => {
      localStorage.setItem("cartId", result.key);
      return result.key;
    });
  }

  getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  addToCart(product: Product) {
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(item => {
      item$.update({
        title : product.title,
        imageUrl:product.imageUrl,
        price:product.price,
        quantity: (item.quantity || 0) + 1
      });
    })
  }

  clearCart(){
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  removeFromCart(product:Product){
    let cartId = this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(item => {
    if(item.quantity==1){
        item$.remove();
      }else{ 
      item$.update({
        title : product.title,
        imageUrl:product.imageUrl,
        price:product.price,
        quantity: (item.quantity || 0) - 1
      });

  }
    })
  
  }


}

