import { Injectable } from '@angular/core';
import {ProductItem} from "./Model/ProductItem";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products: ProductItem[] = [];
  private product: ProductItem | undefined;
  setProduct(product: ProductItem) {
    this.product = product;
    console.log(this.product);
  }
  getProduct(): ProductItem | undefined {
    return this.product;
  }
  constructor(private http: HttpClient) {
    this.http
      .get('https://dummyjson.com/products')
      .subscribe((response: any) => {
        this.products = response.products || [];
      });
  }
}
