import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopservice: ShopService) {
    this.shopParams = this.shopservice.getShopParams();
  }

  ngOnInit(): void {
    this.getproducts(true);
    this.getbrands();
    this.getTypes();
  }
  getproducts(useCache = false) {
    this.shopservice.getproducts(useCache).subscribe(response => {
      this.products = response.data;
      this.totalCount = response.count;

    }, error => {
      console.log(error);
    });
  }

  getbrands() {
    this.shopservice.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes() {
    this.shopservice.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number) {
    const params = this.shopservice.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopservice.setShopParams(params);
    this.getproducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopservice.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopservice.setShopParams(params);
    this.getproducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopservice.getShopParams();
    params.sort = sort;
    this.shopservice.setShopParams(params);
    this.getproducts();
  }

  onpageChange(event: any) {
    const params = this.shopservice.getShopParams();
    if (this.shopParams.pageNumber !== event) {
      params.pageNumber = event;
      this.shopservice.setShopParams(params);
      this.getproducts(true);
    }
  }

  onSearch() {
    const params = this.shopservice.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopservice.setShopParams(params);
    this.getproducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopservice.setShopParams(this.shopParams);
    this.getproducts();
  }
}
