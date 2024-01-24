import {ProductItem} from "../Model/ProductItem";
import {CartService} from "../cart.service";
import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {ProductService} from "../product.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AddressModalComponent} from "../address-modal/address-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit {
  cartItems: Array<[ProductItem, number]> = this.cartService.getCartItems();


  constructor(private dialog: MatDialog,private productService: ProductService, private cartService: CartService, private dataService: DataService, private authService: AuthService,private location:Location,private router:Router) {
  }


  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart;
    });
    const firstTime = localStorage.getItem('key')
    if(!firstTime){
      localStorage.setItem('key','loaded')
      location.reload()
    }else {
      localStorage.removeItem('key')
    }
  }

  increaseQuantity(product: ProductItem) {
    this.cartService.increaseQuantity(product);
  }

  decreaseQuantity(product: ProductItem) {
    this.cartService.decreaseQuantity(product);
  }

  remove(product: ProductItem) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  totalPrice(): number {
    return this.cartService.getTotalPrice();
  }
  selectProduct(product: ProductItem) {
    this.dataService.setProduct(product);
  }
  goToOrders() {
    this.router.navigate(['/orders']);
  }
  createOrder() {
    const dialogRef = this.dialog.open(AddressModalComponent, {
      width: '300px',
      data: { address: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const address = result;
        this.cartService.createOrder(this.cartItems, address);
      }
    });
  }
  isLoggedIn(){
    return this.authService.isAuthenticatedUser()&&(this.cartItems.length!=0);
  }
}
