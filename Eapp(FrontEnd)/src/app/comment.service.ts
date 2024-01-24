import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Commentaire} from "./Model/Commentaire";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Commentaire[] = [];
  constructor(private http:HttpClient) {
  }

  addComment(comment: Commentaire): Promise<Response> {
    return fetch("http://localhost:8080/clients/comments/add", {
      method: 'POST',
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(comment)
    });
  }

  getComments(id:number) {
    return this.http.get(`http://localhost:8080/clients/comments/ByProduct/${id}`);
  }


}
