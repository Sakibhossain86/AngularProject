import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Product } from 'src/app/models/data/product';

import { baseUrl } from 'src/app/models/shared/app-constants';
import { ProductInputModel } from 'src/app/models/view-models/input/product-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { ProductService } from 'src/app/services/data/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
    product:Product= null!;
    imgPath:string= baseUrl;
    productForm: FormGroup = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl(undefined, [Validators.required]),
      isAvailable: new FormControl(undefined),
      picture: new FormControl(undefined, Validators.required)
    });
  
    file: File = null!;
    constructor(
      private productService: ProductService,
      private notifyService: NotifyService,
      private activatedRoute:ActivatedRoute
    ){}
    handleFileInputChange(event: any): void {
      if (event.target.files.length) {
        this.file = event.target.files[0];
        this.productForm.controls['picture'].patchValue(this.file.name);
      }
      else {
        this.productForm.controls['picture'].patchValue("");
      }
      
    }
    save(){
      if(this.productForm.invalid) return;
      let _self = this;
       Object.assign(this.product, this.productForm.value);
       console.log(this.product);
       let data:ProductInputModel = {productID:this.product.productID, productName: this.product.productName, price:this.product.price, isAvailable:this.product.isAvailable};
       this.productService.update(data)
       .subscribe({
        next: r=>{
          this.notifyService.message("Product  updated", "DISMISS");
          if(this.file){
           _self. updateImage();
          }
        }
       })
    }
    updateImage(){
      let _self = this;
      var reader = new FileReader();
          
          reader.onload = function (e: any) {
           _self.productService.uploadImage(<number>_self.product.productID, _self.file)
           .subscribe({
            next:r=>{
              _self.notifyService.message("Picture updated", "DISMISS");
            },
            error: err=>{
              _self.notifyService.message("Picture update failed", "DISMISS");
              throwError(()=>err);
            }
           })
          }
          reader.readAsArrayBuffer(_self.file);
    }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.productService.getById(id)
    .subscribe({
      next: r=>{
        this.product=r;
        this.productForm.patchValue(this.product)
        console.log(this.product)
      },
      error: err=> {
        this.notifyService.message('Failed to load product data', 'DISMISS')
        throwError(()=>err);
      } 
    });
  }
}
