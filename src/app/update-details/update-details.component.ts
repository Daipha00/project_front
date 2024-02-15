// // update-product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  productToUpdate: Product | null = null;
  product: Product = {
    id: 0,
    productName: '',
    productPrice: 0,
    productDiscount: 0,
    // image: null
  };
  productImagesChange: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private urlSecurity: DomSanitizer) {}


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      const numericId: number = Number(productId); // Convert to number
  
      if (!isNaN(numericId)) { // Ensure conversion was successful
        this.productService.getProductById(numericId).subscribe(
          (data) => {
            this.product = data;
            // this.product.image = data.image;
          },
          (error) => {
            console.error('Error fetching product details:', error);
          }
        );
      } else {
        console.error('Invalid product ID:', productId);
      }
    }
  }
  

//   // updateProduct(productForm: NgForm): void {
//   //   const { productName, productPrice, productDiscount, productImages } = this.product;

//   //   if (!productName || !productPrice || !productDiscount || !productImages) {
//   //     alert('Please fill out all fields in the form.');
//   //     return;
//   //   }

//   //   if (productForm.invalid) {
//   //     alert('Invalid form. Please check your inputs.');
//   //     return;
//   //   }

//   //   this.productService.addProduct(this.product).subscribe(
//   //     (response: Product) => {
//   //       productForm.reset();
//   //       this.product.productImages = []; // Clear selected images after successful submission
//   //     },
//   //     (error: HttpErrorResponse) => {
//   //       console.log(error);
//   //     }
//   //   );
//   // }

  updateProduct(productForm: NgForm): void {
    const { id, productName, productPrice, productDiscount } = this.product;

    if (!id || !productName || !productPrice || !productDiscount) {
      alert('Please fill out all fields in the form.');
      return;
    }

    if (productForm.invalid) {
      alert('Invalid form. Please check your inputs.');
      return;
    }

    this.productService.updateProduct(id, this.product).subscribe(
      (response: Product) => {
        productForm.reset();
        // this.product.image= null; 
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // onFileSelected(event: any): void {
  //   if (event.target.files) {
  //     const file = event.target.files[0];

  //     // Set the selected image in the product object
  //     this.product.image = file;

  //     // Emit the file to the parent component or service if needed
  //     this.productImagesChange.emit([file]);
  //   }
  // }

  
  getObjectUrl(file: File): SafeUrl {
    if (file) {
      if (file instanceof File) {
        try {
          return this.urlSecurity.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        } catch (error) {
          console.error('Error creating object URL:', error);
        }
      } else {
        console.error('Invalid file object:', file);
      }
    }
    return '';
  }
  
}


//   // prepareFormData(product: Product): FormData {
//   //   const formData = new FormData();

//   //   formData.append(
//   //     'product',
//   //     new Blob([JSON.stringify(product)], { type: 'application/json' })
//   //   );

//   //   for (const fileHandle of product.productImages) {
//   //     formData.append('imageFile', fileHandle.file, fileHandle.file.name);
//   //   }
//   //   return formData;
//   // }

//   // onFileSelected(event: any): void {
//   //   if (event.target.files) {
//   //     const files = event.target.files;

//   //     for (const file of files) {
//   //       const fileHandle: FileHandle = {
//   //         file: file,
//   //         url: this.urlSecurity.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
//   //         picByte: function (picByte: any, type: any): unknown {
//   //           throw new Error('Function not implemented.');
//   //         },
//   //         type: function (picByte: any, type: any): unknown {
//   //           throw new Error('Function not implemented.');
//   //         },
//   //         name: ''
//   //       };

//   //       this.product.productImages.push(fileHandle);
//   //     }
//   //   }
//   // }

//   // removeImage(index: number): void {
//   //   this.product.productImages.splice(index, 1);
//   // }
// }







// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ProductService } from '../_services/product.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { Product } from '../_model/product.model';

//  @Component({
//    selector: 'app-update-product',
//    templateUrl: './update-details.component.html',
//    styleUrls: ['./update-details.component.css']
//  })
// export class UpdateDetailsComponent implements OnInit {
//   @Input() productToUpdate: Product | null = null; // Input to receive the product for update
//   @Output() productImagesChange = new EventEmitter<File[]>();

//   product: Product = {
//     id: 0,
//     productName: '',
//     productPrice: 0,
//     productDiscount: 0,
//     image: null
//   };

//   constructor(private productService: ProductService, private urlSecurity: DomSanitizer) {}

//   ngOnInit(): void {
//     // If productToUpdate is provided, populate the form for update
//     if (this.productToUpdate) {
//       this.product = { ...this.productToUpdate }; // Copy the product to avoid modifying the original
//     }
//   }

//   addProduct(productForm: NgForm): void {
//     const { id, productName, productPrice, productDiscount, image } = this.product;

//     if (!productName || !productPrice || !productDiscount || !image) {
//       alert('Please fill out all fields in the form.');
//       return;
//     }

//     if (productForm.invalid) {
//       alert('Invalid form. Please check your inputs.');
//       return;
//     }

//     // If id is present, it's an update; otherwise, it's an add operation
//     if (id) {
//       this.productService.updateProduct(id, this.product).subscribe(
//         (response: Product) => {
//           productForm.reset();
//           this.product.image = null; // Clear selected image after successful submission
//         },
//         (error: HttpErrorResponse) => {
//           console.log(error);
//         }
//       );
//     } else {
//       this.productService.addProduct(this.product).subscribe(
//         (response: Product) => {
//           productForm.reset();
//           this.product.image = null; // Clear selected image after successful submission
//         },
//         (error: HttpErrorResponse) => {
//           console.log(error);
//         }
//       );
//     }
//   }

//   onFileSelected(event: any): void {
//     if (event.target.files) {
//       const file = event.target.files[0];

//       this.product.image = file;

//       this.productImagesChange.emit([file]);
//     }
//   }

//   getObjectUrl(file: File): SafeUrl {
//     return this.urlSecurity.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
//   }
// }


// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { ProductService } from '../_services/product.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { Product } from '../_model/product.model';

// @Component({
//   selector: 'app-update-product',
//   templateUrl: './update-details.component.html',
//   styleUrls: ['./update-details.component.css']
// })
// export class UpdateDetailsComponent implements OnInit {
//   @Input() productToUpdate: Product | null = null; // Input to receive the product for update
//   @Output() productImagesChange = new EventEmitter<File[]>();

//   product: Product = {
//     id: 0,
//     productName: '',
//     productPrice: 0,
//     productDiscount: 0,
//     image: null
//   };

//   constructor(private productService: ProductService, private urlSecurity: DomSanitizer) {}

//   ngOnInit(): void {
//     // If productToUpdate is provided, populate the form for update
//     if (this.productToUpdate) {
//       this.product = { ...this.productToUpdate }; // Copy the product to avoid modifying the original
//     }
//   }

//   updateProduct(productForm: NgForm): void {
//     const { id, productName, productPrice, productDiscount, image } = this.product;

//     if (!id || !productName || !productPrice || !productDiscount || !image) {
//       alert('Please fill out all fields in the form.');
//       return;
//     }

//     if (productForm.invalid) {
//       alert('Invalid form. Please check your inputs.');
//       return;
//     }

//     this.productService.updateProduct(id, this.product).subscribe(
//       (response: Product) => {
//         productForm.reset();
//         this.product.image = null; // Clear selected image after successful submission
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error);
//       }
//     );
//   }

//   onFileSelected(event: any): void {
//     if (event.target.files) {
//       const file = event.target.files[0];

//       this.product.image = file;

//       this.productImagesChange.emit([file]);
//     }
//   }

//   getObjectUrl(file: File): SafeUrl {
//     return this.urlSecurity.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
//   }
// }
