import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from '../shop/product-detail/product-detail.component';
import { ProductDetailResolver } from '../_resolvers/product-detail.resolver';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: ':id', component: ProductDetailComponent, resolve: {product: ProductDetailResolver}, 
  data: {breadcrumb: {alias: 'productDetails'}} },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
