import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  product: any[] = [];
constructor(private productService: ProductService,
  // private imageProcessingService: ImageProcessingService 
  ){}

  ngOnInit(): void {
    this.getProduct();
  }


  public getProduct(): void {
    this.productService.getProduct()
    .subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
   
    );
  }

}
