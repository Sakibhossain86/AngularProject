import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { apiUrl, baseUrl } from 'src/app/models/shared/app-constants';
import { ProductViewModel } from 'src/app/models/view-models/product-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { ProductService } from 'src/app/services/data/product.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  picPath:string = `${baseUrl}/Pictures`
  products:ProductViewModel[] =[];
  dataSource:MatTableDataSource<ProductViewModel> = new MatTableDataSource(this.products)
  columns:string[] =['picture','productName', 'price', 'isAvailable', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private productService:ProductService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  confirmDelete(data:ProductViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.productService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.message('Product removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.productID != data.productID);
          },
          error:err=>{
            this.notifyService.message('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.productService.getVM()
    .subscribe({
      next:r=>{
        this.products = r;
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

}
