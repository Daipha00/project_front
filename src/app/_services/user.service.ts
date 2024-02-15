import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH = "http://localhost:8080"

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService:UserAuthService
    ) { }


  public login(loginData: any) {
    return this.httpclient.post(this.PATH + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    let userRoles: any = this.userAuthService.getRoles();
  
    if (userRoles !== null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            break; // Break out of the inner loop when a match is found
          }
        }
        if (isMatch) {
          break; // Break out of the outer loop when a match is found
        }
      }
    }
    return isMatch;
  }
  



  }


