import {Component, Directive, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ProductItem} from "../Model/ProductItem";
import {Location} from '@angular/common';
import {CartService} from "../cart.service";
import {AuthService} from "../auth.service";
import {CommentService} from "../comment.service";
import { Commentaire } from '../Model/Commentaire';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{
  product : any;
  comments: any;
  newCommentText: string = '';
  constructor(private productService:ProductService,private route : ActivatedRoute,
              private cartService:CartService, private dataService : DataService,
              private location: Location,private commentService: CommentService,
              private authService: AuthService) {
  }
  public addToCart(product: ProductItem){
    this.cartService.addToCart(product, 1);
  }
  public goBack(){
    this.location.back();
  }
  addComment(): void {
    const idClient = this.authService.getUserDetails().id;
    const userName = this.authService.getUserDetails().nom + " " + this.authService.getUserDetails().prenom;

    if (idClient && userName && this.newCommentText) {
      const comment: Commentaire = {
        userName,
        date: new Date(),
        comment: this.newCommentText,
        idClient,
        idProduct: this.product.id
      };
      this.commentService.addComment(comment).then(() => {
        this.commentService.getComments(this.product.id).subscribe((data) => {
          this.comments = data;
        });
        this.newCommentText = '';
      });
    }
  }
  isAuth():boolean{
    return this.authService.isAuthenticatedUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id : number = params['id'];
      console.log(id);
      this.productService.getProductById(id).subscribe((response) => { this.product = response;
      console.log(response);
        this.commentService.getComments(this.product.id).subscribe((data) => {
          this.comments = data;
        });});
    })

  }
}
