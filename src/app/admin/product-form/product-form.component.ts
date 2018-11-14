import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from './../../category.service';
import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import {Router,ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {
    "title":'',
    "price":'',
    "category":'',
    "imageUrl":''
  };
  id;
  successMsg:string='';
  errorMsg:string='';
  isSuccess:boolean=false;
  isFailure:boolean = false;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService) { 
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).subscribe(p => this.product = p);
  }

  save(product){
    this.isFailure = false;
    this.isSuccess = false;
    if(this.id){
      this.productService.update(this.id,product).then(res=>{
        this.successMsg = 'Product updated successfully';
        this.isSuccess = true;
        setTimeout(()=>{
          this.router.navigate(['/admin/products']);
        },2000);
      },err=>{
        this.isFailure = true;
        this.errorMsg = 'Product update failed with error'+err;
      });
    } else{
    this.productService.create(product).then(res=>{
        this.successMsg = 'Product added successfully';
        this.isSuccess = true;
        setTimeout(()=>{
          this.router.navigate(['/admin/products']);
          },2000);
        },err=>{
        this.isFailure = true;
        this.errorMsg = 'Product add failed with error '+err;
       });
  }
}

delete(){
   this.isFailure = false;
    this.isSuccess = false;
  if(confirm("Are you sure ?")){
    this.productService.delete(this.id).then(res=>{
      console.log(res);
      this.successMsg = 'Product deleted successfully';
      this.isSuccess = true;
      setTimeout(()=>{
        this.router.navigate(['/admin/products']);
        },2000);
      },err=>{
      this.isFailure = true;
      this.errorMsg = 'Product deletion error '+err;
     });
  }else{
    this.isFailure = false;
    this.isSuccess = false;
  }
}
  
  ngOnInit(){

  }

  
 

}
