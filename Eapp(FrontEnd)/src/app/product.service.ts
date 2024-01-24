import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products : any;
  constructor(private http : HttpClient) {}
  // product.service.ts
  getAll(): Observable<any> {
    return this.http.get("https://dummyjson.com/products?limit=100");
  }
  getProduitByTXT(searchtxt:any){
    return this.http.get("https://dummyjson.com/products/search?q="+searchtxt);
  }
  getProductById(id:number|undefined) : Observable<any>{
    return this.http.get("https://dummyjson.com/products/" + id);
  }
  getProductBySearchText(searchText: string | undefined): Observable<any> {
    console.log("search executed");
    return this.http.get("https://dummyjson.com/products/search?q=" + searchText).pipe(
      catchError(error => {
        console.error('Error in HTTP request:', error);
        throw error;
      })
    );
  }
  getProductsByCat(category: string | null){
    return this.http.get('https://dummyjson.com/products/category/'+category);
  }
}
