import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/data/product';
import { ProductInputModel } from 'src/app/models/view-models/input/product-input-model';

import { NotifyService } from 'src/app/services/common/notify.service';
import { ProductService } from 'src/app/services/data/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = { productName: undefined, price: undefined, isAvailable: undefined };

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl(undefined, [Validators.required]),
    isAvailable: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });

  file: File = null!;
  save() {
    if (this.productForm.invalid) return;
    Object.assign(this.product, this.productForm.value)
    //console.log(this.product);
    var _self = this;
    
    this.productService.insert(this.product)
      .subscribe({
        next: r => {
          _self.notifyService.message('Data saved', 'DISMISS');
         
          var reader = new FileReader();
          
          reader.onload = function (e: any) {
            console.log(e);
            _self.productService.uploadImage(<number>r.productID, _self.file)
              .subscribe({
                next: r => {
                  console.log(r);
                  _self.notifyService.message('Picture uploaded', 'DISMISS');
                  _self.product.picture= r.pictureName;
                  console.log(_self.product)
                },
                error: err => {
                  _self.notifyService.message('Picture upload failed', 'DISMISS');
                }
              });
          }
          reader.readAsArrayBuffer(_self.file);
        },
        error: err => {
        _self.notifyService.message('Failed to save product', 'DISMISS')
        }
      });


  }
  handleFileInputChange(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.productForm.controls['picture'].patchValue(this.file.name);
    }
    else {
      this.productForm.controls['picture'].patchValue("");
    }
    
  }
  constructor(
    private productService: ProductService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {

  }

}
