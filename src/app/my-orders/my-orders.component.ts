import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  constructor(private orderService:OrderService,private authSerice:AuthService) {
    this.orders$ = this.authSerice.user$.pipe(switchMap( u => orderService.getOrdersByUser(u.uid) ));
   }

  ngOnInit() {
  }

}
