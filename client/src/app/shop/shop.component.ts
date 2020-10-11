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
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc'},
    { name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopservice: ShopService) { }

  ngOnInit(): void {
    this.getproducts();
    this.getbrands();
    this.getTypes();
  }
  getproducts(){
    this.shopservice.getproducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
      
    }, error => {
      console.log(error);
    });
  }

  getbrands(){
    this.shopservice.getBrands().subscribe(response => {
      this.brands = [{id: 0 , name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopservice.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getproducts();
  }

  onpageChange(event: any){
    if (this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getproducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getproducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getproducts();
  }
}
