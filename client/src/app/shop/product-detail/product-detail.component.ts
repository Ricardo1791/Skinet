import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  constructor(private shopservice: ShopService, private route: ActivatedRoute,
    private bcservice: BreadcrumbService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      this.bcservice.set('@productDetails', this.product.name)
    });
  }
  // loadProduct(){
  //   this.shopservice.getProduct(2).subscribe(response => {
  //     this.product = response;
  //   },
  //   error => {
  //     console.log(error);
  //   });
  // }
}
