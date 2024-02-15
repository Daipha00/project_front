
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  productId!: number;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router:Router,
    // private imagesDialog: MatDialog,
    // private imageProcessingService: ImageProcessingService
  ) {}

  ngOnInit(): void {
    // Extract the product ID from the route parameters
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert to number
      this.getProductDetails();
    });
  }
  

  getProductDetails(): void {
    // Call the ProductService to get product details by ID
    this.productService.getProductById(this.productId)
      .subscribe(
        (data) => {
          this.product = data;
          // this.product.image = data.image
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
  }
  

  

 
}
