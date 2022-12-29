import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { OrderItem } from 'src/app/models/data/order-item';
import { Status } from 'src/app/models/shared/app-constants';
import { OrderAndOrderItemViewModel } from 'src/app/models/view-models/order-and-order-item-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { OrderService } from 'src/app/services/data/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  order:OrderAndOrderItemViewModel = {};
  
  dataSource= new MatTableDataSource(this.order.orderItems);
  columns:string[] = ['product', 'price', 'quantity', 'amount'];
  
    constructor(
      private orderService:OrderService,
      private notifyService:NotifyService,
      private activatedRoute:ActivatedRoute
    ){}
    getStatusName(v:any):string {
      return Status[<number>v];
     }
  ngOnInit(): void {
    this.order.orderItems=[];
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.orderService.getWithItems(id)
    .subscribe({
      next: r=>{
        this.order= r;
        console.log(this.order)
        this.dataSource.data=this.order.orderItems as OrderItem[];
      },
      error:err=>{
        this.notifyService.message('Failed to load orders', 'DISMISS');
        throwError(()=> err);
      }
    });
  }
}
