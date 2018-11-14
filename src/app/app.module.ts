import { OrderService } from './order.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {FormsModule} from '@angular/forms';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {DataTableModule} from 'angular-6-datatable';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShippingCartSummaryComponent } from './shipping-cart-summary/shipping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    SignUpComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShippingCartSummaryComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase) ,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',component:ProductsComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'sign-up',component:SignUpComponent},

      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success/:id',component:OrderSuccessComponent,canActivate:[AuthGuard]},
      {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuard]},

      {path:'sign-up',component:SignUpComponent},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]}

    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
