import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ClientService} from "../client.service";
import {Client} from "../Model/Client";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  clients:any;
  constructor(private serviceClient:ClientService) {
  }
  ngOnInit(): void {
    this.clients = this.serviceClient.getClients().subscribe(data=>this.clients=data);
  }
  putClient( nom:string, prenom:string, age:number, email:string, password:string){
    this.serviceClient.createClient(new Client(nom,prenom,age,email,password));
  }


}
