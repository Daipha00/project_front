// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Product } from './_model/product.model';
// import { Observable, of } from 'rxjs';
// import { error } from 'console';
// import { ProductService } from './_services/product.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductResolveService implements Resolve<Product> {

//   constructor(private productService: ProductService) { }
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
//     const id = route.paramMap.get('id');

//     if(id){
//       return this.productService.getProductById(id);
//     }else{
//       return of(this.getProductDetails());
//     }
//   }
//   getProductDetails(){
//     return{
//     id: 0,
//     productName: '',
//     productPrice: 0,
//     productDiscount: 0,
//     productImages: []
//     }
//   }

  
// }
