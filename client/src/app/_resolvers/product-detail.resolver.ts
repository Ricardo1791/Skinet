import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { ShopService } from '../shop/shop.service';
import { catchError } from 'rxjs/operators';
 
@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<IProduct> {

    constructor(private shopService: ShopService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
        return this.shopService.getProduct(route.params['id']).pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/shop']);
                return of(null);
            })
        );
    }

}