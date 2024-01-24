import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) {}

  // Get orders for a specific user
  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/clients/orders/user/${userId}`);
  }
  getOrderDetailByCommandeId(commandeId :any){
    return this.http.get(`http://localhost:8080/clients/orderDetail/user/${commandeId}`);
  }
  deleteCommande(idCommande:any){
    fetch('http://localhost:8080/clients/orders/delete/'+idCommande, {
      method: 'DELETE',
      headers : { 'Content-Type' : 'application/json'}
    });
  }

}
