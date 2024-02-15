import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../_services/file.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit{
  fileStatus = { status: '', requestType: '', percent: 0};
  filenames: string[] = [];
  persistedFilenames: string[] = [];
  
constructor(private fileService: FileService){}

  ngOnInit(): void { }

   //function to download file
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

   persistedFilenamesString = localStorage.getItem('persistedFilenames');
  if (persistedFilenamesString) {
    this.persistedFilenames = JSON.parse(persistedFilenamesString);
  }
}
  


