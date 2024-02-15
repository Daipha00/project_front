import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAllProducts() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }


// public addProduct(product: Product): Observable<Product> {
//   return this.httpClient.post<Product>('http://localhost:8080/addProduct', product);
// }

addProduct(product: Product): Observable<Product> {
  const formData: FormData = new FormData();
  formData.append('productName', product.productName.toString());
  formData.append('productPrice', product.productPrice.toString());
  formData.append('productDiscount', product.productDiscount.toString());
 
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');

  return this.httpClient.post<Product>('http://localhost:8080/addProduct', formData);
}


  public getProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8080/getAllProducts');
  }


  public deleteProduct(id: number){
    return this.httpClient.delete("http://localhost:8080/deleteProduct/" + id);
  }

  public getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/getProduct/' + id);
  }

  public updateProduct(id: number, product: Product): Observable<Product> {
    const updateProductUrl = `http://localhost:8080/updateProduct/${id}`;
    return this.httpClient.put<Product>(updateProductUrl, product);
  }
}
