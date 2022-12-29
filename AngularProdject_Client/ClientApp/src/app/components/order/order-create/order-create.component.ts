import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { Customer } from 'src/app/models/data/customer';
import { Order } from 'src/app/models/data/order';
import { Product } from 'src/app/models/data/product';
import { Status } from 'src/app/models/shared/app-constants';
import { NotifyService } from 'src/app/services/common/notify.service';
import { CustomerService } from 'src/app/services/data/customer.service';
import { OrderService } from 'src/app/services/data/order.service';
import { ProductService } from 'src/app/services/data/product.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  order:Order = {customerID:undefined, orderDate:undefined, deliveryDate:undefined, status:undefined}
  customers:Customer[] = [];
  products:Product[] =[];
  //
  statusOptions:{label:string, value:number}[] =[];
  //
  orderForm:FormGroup= new FormGroup({
    customerID: new FormControl(undefined, Validators.required),
    orderDate: new FormControl(undefined, Validators.required),
    deliveryDate: new FormControl(undefined),
    status: new FormControl(undefined, Validators.required),
    orderItems: new FormArray([])
  })
  constructor(
    private orderService: OrderService,
    private productService:ProductService,
    private customerService:CustomerService,
    private notifyService:NotifyService
  ) { }
save(){
  if(this.orderForm.invalid) return;
  //console.log(this.orderForm.value);
  Object.assign(this.order, this.orderForm.value);
  //console.log(this.order);
  this.orderService.insert(this.order)
  .subscribe({
    next:r=>{
      this.notifyService.message("Data saved", 'DISMISS');
    },
    error:err=>{
      this.notifyService.message("Failed to load products", 'DISMISS');
      throwError(()=>err);
    }
  })
}
get orderItemsFormArray(){
  return this.orderForm.controls["orderItems"] as FormArray;
}
addItem(){
  this.orderItemsFormArray.push(new FormGroup({
    productID: new FormControl(undefined, Validators.required),
    quantity:new FormControl(undefined, Validators.required)
  }))
}
removeItem(index:number){
  if(this.orderItemsFormArray.controls.length> 1)
    this.orderItemsFormArray.removeAt(index);
}
  ngOnInit(): void {
    this.customerService.get()
    .subscribe({
      next: r=>{
        this.customers = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load customers", 'DISMISS');
      }
    });
    this.productService.get()
    .subscribe({
      next: r=>{
        this.products = r;
      },
      error: err=>{
        this.notifyService.message("Failed to load products", 'DISMISS');
      }
    });
    Object.keys(Status).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.statusOptions.push({label: v, value:<any> Status[v]});
    });
    //console.log(this.statusOptions)
    this.addItem();
  }

}
