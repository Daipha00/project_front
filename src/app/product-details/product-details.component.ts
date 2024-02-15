import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] // Correct the styleUrl to styleUrls
})
export class ProductDetailsComponent implements OnInit {
  products: Product[] = [];

  displayedColumns: string[] = ['id', 'productName', 'productPrice', 'productDiscount','images','view', 'delete', 'update'];
 

  constructor(private productService: ProductService, private router: Router,
   
    ) {} 

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(): void {
    this.productService.getProduct()
    .subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(id: number) {
    console.log('Deleting product with id:', id);
    this.productService.deleteProduct(id).subscribe(
      (resp: any) => {
        console.log(resp);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  editDetails(id: any) {
    this.router.navigate(['/update-details', { id: id }]);
  }

  
}
