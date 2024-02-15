
import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  // constructor(private sanitizer: DomSanitizer) { }

  // public createImage(product: Product): Product {
  //   if (!product || !product.productImages) {
  //     // Handle the case where product or product.productImages is undefined
  //     return product;
  //   }

  //   const productImages: any[] = product.productImages;

  //   const productImagesToFileHandle: FileHandle[] = [];

  //   for (let i = 0; i < productImages.length; i++) {
  //     const imageFileData = productImages[i];

  //     if (imageFileData && imageFileData.picByte && imageFileData.type && imageFileData.name) {
  //     const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

  //     const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

  //     const finalFileHandle: FileHandle = {
  //       file: imageFile,
  //       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile)),
  //       picByte: function (picByte: any, type: any): unknown {
  //         throw new Error('Function not implemented.');
  //       },
  //       type: function (picByte: any, type: any): unknown {
  //         throw new Error('Function not implemented.');
  //       },
  //       name: ''
  //     };

  //     productImagesToFileHandle.push(finalFileHandle);
  //   } else {
  //     console.error('Invalid image data at index', i, 'in product', product);
  //   }
  //   }

  //   product.productImages = productImagesToFileHandle;
  //   return product;

  //   // // Create a new Product object with the processed images
  //   // const processedProduct: Product = {
  //   //   id: product.id,
  //   //   productName: product.productName,
  //   //   productPrice: product.productPrice,
  //   //   productDiscount: product.productDiscount,
  //   //   productImages: productImagesToFileHandle
  //   // };

  //   // return processedProduct; // Return the processed product
  // }

  // public dataURItoBlob(picBytes: string, imageType: string): Blob {
  //   const byteString = window.atob(picBytes);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);

  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }

  //   const blob = new Blob([int8Array], { type: imageType});
  //   return blob;
  // }
}
