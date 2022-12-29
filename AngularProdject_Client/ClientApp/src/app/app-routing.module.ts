import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { HomeComponent } from './components/home/home.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { OrderViewComponent } from './components/order/order-view/order-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'customers',component:CustomerViewComponent},
  {path:'customer-create', component:CustomerCreateComponent},
  {path:'customer-edit/:id', component:CustomerEditComponent},
  {path:'products', component:ProductViewComponent},
  {path:'product-create', component:ProductCreateComponent},
  {path:'product-edit/:id', component:ProductEditComponent},
  {path: 'order', component:OrderViewComponent},
  {path: 'order-create', component:OrderCreateComponent},
  {path: 'order-details/:id', component:OrderDetailsComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
