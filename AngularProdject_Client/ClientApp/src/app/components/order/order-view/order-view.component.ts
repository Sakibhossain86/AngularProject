import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { Status } from 'src/app/models/shared/app-constants';
import { OrderViewModel } from 'src/app/models/view-models/order-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { OrderService } from 'src/app/services/data/order.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  orders:OrderViewModel[] = [];
  dataSource:MatTableDataSource<OrderViewModel> = new MatTableDataSource(this.orders);
  columns:string[] = [ 'customerName', 'orderDate','deliveryDate', 'status', 'orderValue','details', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private orderService:OrderService,
    private notifyService:NotifyService
  ) { }
 getStatusName(v:number):string {
  return Status[v];
 }
  ngOnInit(): void {
    this.orderService.getVM()
    .subscribe({
      next: r=> {
        this.orders = r;
        this.dataSource.data = this.orders;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:err=>{
        this.notifyService.message('Failed to load orders', 'DISMISS');
        throwError(()=> err);
      }
    })
  }

}
