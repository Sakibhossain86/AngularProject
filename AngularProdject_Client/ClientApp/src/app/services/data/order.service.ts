import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/data/order';
import { apiUrl } from 'src/app/models/shared/app-constants';
import { OrderAndOrderItemViewModel } from 'src/app/models/view-models/order-and-order-item-view-model';
import { OrderViewModel } from 'src/app/models/view-models/order-view-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient
  ) { }
  get():Observable<Order[]>{
    return this.http.get<Order[]>(`${apiUrl}/Orders`);
  }
  getVM():Observable<OrderViewModel[]>{
    return this.http.get<OrderViewModel[]>(`${apiUrl}/Orders/VM`);
  }
  getWithItems(id:number):Observable<OrderAndOrderItemViewModel>{
    return this.http.get<OrderAndOrderItemViewModel>(`${apiUrl}/Orders/${id}/OI`)
  }
  insert(data:Order):Observable<Order>{
    return this.http.post(`${apiUrl}/Orders`, data)
  }
}
