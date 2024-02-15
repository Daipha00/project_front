// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserAuthService {

//   constructor() { }

//   public setRoles(roles: []) {
//     localStorage.setItem('roles', JSON.stringify(roles));
//   }

//   public getRoles(): [] {
//     return JSON.parse(localStorage.getItem('roles'));
//   }

//   public setToken(jwtToken: string) {
//     localStorage.setItem('jwtToken', jwtToken);
//   }

//   public getToken(): string {
//     return localStorage.getItem('jwtToken');
//   }

//   public clear() {
//     localStorage.clear();
//   }

//   public isLoggedIn() {
//     return this.getRoles() && this.getToken();
//   }
// }



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: any[]) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): any[] {
    if (this.isLocalStorageAvailable()) {
      const rolesString = localStorage.getItem('roles');
      return rolesString ? JSON.parse(rolesString) : [];
    }
    return [];
  }

  public setToken(jwtToken: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  public clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test_key__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  public isAdmin(){
    const roles: any[] =  this.getRoles();
    // return roles[0].roleName === 'Admin';
    return roles.length > 0 && roles[0].roleName === 'Admin';
  }

  public isUser(){
    const roles: any[] =  this.getRoles();
    // return roles[0].roleName === 'User';
    return roles.length > 0 && roles[0].roleName === 'User';
  }
}
