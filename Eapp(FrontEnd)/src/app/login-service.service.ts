import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  checkLog(email: string, password: string): Observable<any> {
    const url = `http://localhost:8080/clients/login?email=${email}&password=${password}`;
    return this.http.get(url);
  }
  checkEmail(email: string): Observable<any> {
    const url = `http://localhost:8080/clients/email?email=${email}`;
    return this.http.get(url);
  }
  getById(id:any){
    const url = `http://localhost:8080/clients/`+id;
    return this.http.get(url);
  }
}
