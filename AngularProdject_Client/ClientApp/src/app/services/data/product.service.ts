import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Product } from 'src/app/models/data/product';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { ImagePathResponse } from 'src/app/models/shared/image-path-response';
import { ProductInputModel } from 'src/app/models/view-models/input/product-input-model';
import { ProductViewModel } from 'src/app/models/view-models/product-view-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }
   get():Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}/Products`);
  } 
  getVM():Observable<ProductViewModel[]>{
    return this.http.get<ProductViewModel[]>(`${apiUrl}/Products/VM`);
  } 
  getById(id:number):Observable<Product>{
    return this.http.get<Product>(`${apiUrl}/Products/${id}`);
  } 
  insert(data:ProductInputModel):Observable<Product>{
    return this.http.post<Product>(`${apiUrl}/Products/VM`, data);
  }
  update(data:ProductInputModel):Observable<any>{
    return this.http.put<any>(`${apiUrl}/Products/${data.productID}/VM`, data);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Products/Upload/${id}`, formData);
  }
  delete(data:ProductViewModel):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/Products/${data.productID}`);
  }
  
}
