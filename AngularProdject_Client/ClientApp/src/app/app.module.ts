import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { MatImportModule } from './modules/mat-import/mat-import.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/data/customer.service';
import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { NotifyService } from './services/common/notify.service';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';

import { ProductService } from './services/data/product.service';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';

import { OrderService } from './services/data/order.service';
import { OrderViewComponent } from './components/order/order-view/order-view.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { DatePipe } from '@angular/common';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CustomerViewComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    ConfirmDialogComponent,
    ProductViewComponent,
    ProductCreateComponent,
    OrderViewComponent,
    OrderCreateComponent,
    ProductEditComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatImportModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
   
    DatePipe
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [HttpClient, CustomerService, ProductService, OrderService, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
