import { Customer } from "../data/customer";
import { OrderItem } from "../data/order-item";
import { Status } from "../shared/app-constants";

export interface OrderAndOrderItemViewModel {
    orderID?:number;
    orderDate?:Date;
    deliveryDate?:Date;
    status?:Status;
    customerID?:number;
    orderItems?:OrderItem[];
    customer?:Customer;
}
