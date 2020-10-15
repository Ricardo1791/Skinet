import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  constructor(private shopservice: ShopService, private route: ActivatedRoute,
              private bcservice: BreadcrumbService, private basketservice: BasketService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      this.bcservice.set('@productDetails', this.product.name)
    });
  }

  addItemToBasket(){
    this.basketservice.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if (this.quantity > 1){
      this.quantity--;
    }
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
