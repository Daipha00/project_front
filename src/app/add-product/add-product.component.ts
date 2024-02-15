import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../_model/product.model';
import { FileService } from '../_services/file.service';
import { File } from 'buffer';
import { error } from 'console';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  // @Output() productImagesChange = new EventEmitter<File[]>();
  

  product: Product = {
    id: 0,
    productName: '',
    productPrice: 0,
    productDiscount: 0,
    // image: null
  };
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0};

  constructor(private productService: ProductService, private urlSecurity: DomSanitizer, private fileService: FileService) { }

  ngOnInit(): void { }

  addProduct(productForm: NgForm): void {
    const { productName, productPrice, productDiscount } = this.product;

    if (!productName || !productPrice || !productDiscount) {
      alert('Please fill out all fields in the form.');
      return;
    }

    if (productForm.invalid) {
      alert('Invalid form. Please check your inputs.');
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        productForm.reset();
        // this.product.image = null; 
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  onUploadFile(event: any): void {
    const files: FileList | null = event?.target?.files;
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      this.fileService.upload(formData).subscribe(
        (uploadEvent: HttpEvent<string[]>) => {
          this.resportProgress(uploadEvent);
          // Store filenames in localStorage
          localStorage.setItem('persistedFilenames', JSON.stringify(this.filenames));
        },
        (error: HttpErrorResponse) => console.error(error)
      );
    }
  }
  

  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) =>  console.log(error)
    );
  }

  getFileUrl(filename: string): string {
    // Replace 'your_base_url' with the actual base URL of your file server
    return `http://localhost:8080/file//download/${filename}`;
  }
  

  resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
   switch(httpEvent.type){
    case HttpEventType.UploadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total, 'Uploading');
      break;
      case HttpEventType.DownloadProgress:
      this.updateStatus(httpEvent.loaded, httpEvent.total, 'Downloading');
      break;
      case HttpEventType.ResponseHeader:
      console.log('Header returned', httpEvent)
      break;
      case HttpEventType.Response:
      if (httpEvent.body instanceof Array){
       for (const filename of httpEvent.body){
        this.filenames.unshift(filename);
       }
      } else {
        saveAs(
          new Blob([httpEvent.body], { type: httpEvent.headers.get('Content-Type') }),
          httpEvent.headers.get('File-Name') || 'download'
        );

          //  saveAs(new Blob([httpEvent.body!], {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}
          //  ), httpEvent.headers.get('File-Name'));
      }
      break;
      default:
        console.log(httpEvent);
        break; 
   }
  }

  
  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }



 
}


