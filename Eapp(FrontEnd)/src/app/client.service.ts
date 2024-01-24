import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientComponent} from "./client/client.component";
import {Client} from "./Model/Client";
import {Observable} from "rxjs";
import {FakeClient} from "./Model/FakeClient";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  getClients(){
    return this.http.get("http://localhost:8080/clients/");
  }


  createClient(client : Client): Promise<Response>{
    return fetch("http://localhost:8080/clients/", {
      method: 'POST',
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(client)
    });
  }

  getClientById(id: number): Observable<Client>{
    return this.http.get<Client>("http://localhost:8080/clients/${id}");
  }

  updateClientL(client:Client): Observable<Object>{
    return this.http.put("http://localhost:8080/clients/update",client);
  }
  updateClient(client:FakeClient): Promise<Response>{
    console.log(JSON.stringify(client));
    return fetch("http://localhost:8080/clients/update", {
      method: 'PUT',
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(client)
    });
  }


  deleteClient(email: any){
    fetch('http://localhost:8080/clients/deleteByEmail/'+email, {
      method: 'DELETE',
      headers : { 'Content-Type' : 'application/json'}
    });
  }
}
