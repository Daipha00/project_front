import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { blob } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private server = 'http://localhost:8080'

  constructor( private http: HttpClient) { }

  //function to upload image
  upload(formData: FormData): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
      reportProgress : true,
      observe: 'events'
    })
  }

  //function to download image
  download(filename: string): Observable<HttpEvent<Blob>>{
    return this.http.get(`${this.server}/file/download/${filename}`, {
      reportProgress : true,
      observe: 'events',
      responseType: 'blob' 
    })
  }

  //function to display image
  display(filename: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.server}/file/display/${filename}`, {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }
}
