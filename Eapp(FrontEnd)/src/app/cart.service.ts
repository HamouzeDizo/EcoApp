//test
import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from 'rxjs';
import {ProductItem} from './Model/ProductItem';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {FakeCart} from "./Model/FakeCart";
import {ProductService} from "./product.service";
import {FakeDetailCommande} from "./Model/FakeDetailCommande";
import {FakeCommande} from "./Model/FakeCommande";
import {Client} from "./Model/Client";
import {FakeClient} from "./Model/FakeClient";
import {Commande} from "./Model/Commande";
import {CommandeService} from "./commande.service";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey: string = 'cartItem';
  private cart: Array<[ProductItem, number]> = [];
  private cartSubject = new BehaviorSubject<Array<[ProductItem, number]>>([]);

  cart$ = this.cartSubject.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private productService: ProductService,
    private commandService:CommandeService
  ) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const userId = this.authService.getUserDetails()?.id;
    if (userId) {
      const storageKey = `${this.storageKey}_${userId}`;
      this.cart = JSON.parse(localStorage.getItem(storageKey) || '[]');
      this.cartSubject.next(this.cart);
    }
    else {
      const storageKey = `${this.storageKey}`;
      this.cart = JSON.parse(localStorage.getItem(storageKey) || '[]');
      this.cartSubject.next(this.cart);
    }
  }

  private saveCartToStorage() {
    const userId = this.authService.getUserDetails()?.id;
    if (userId) {
      const storageKey = `${this.storageKey}_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(this.cart));
    }
  }

  addToCart( item: ProductItem,qte:number) {
    for (var i of this.cart){
      if (i[0].id==item.id){
        i[1]+=qte;
        this.cartSubject.next(this.cart);
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        return;
      }
    }
    this.cart.push([item,qte]);
    this.cartSubject.next(this.cart);
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    this.saveCartToStorage();
  }

  removeFromCart(item: ProductItem) {

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i][0].id === item.id) {
        this.cart.splice(i, 1);
        this.cartSubject.next(this.cart);
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        break;
      }
    }
    this.saveCartToStorage();
  }


  clearCart() {

    this.cart = [];
    localStorage.removeItem(this.storageKey);
    window.location.reload();
    this.saveCartToStorage();
  }


  increaseQuantity(item: ProductItem) {
    for (var i of this.cart) {
      if (i[0].id == item.id) {
        i[1]++;
        this.cartSubject.next(this.cart);
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        return;
      }
    }
  }

  decreaseQuantity(item: ProductItem) {
    for (var i of this.cart) {
      if (i[0].id == item.id) {
        if (i[1] >= 2) {
          i[1]--;
          this.cartSubject.next(this.cart);
          localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        }
      }
    }
  }


  getCartItems() {
      let cart = localStorage.getItem('cartItem');
      return cart ? JSON.parse(cart) : [];
  }
  getCart():Array<[ProductItem, number]> {
    const test: Array<[ProductItem, number]> = new Array<[ProductItem, number]>();
    const userId = this.authService.getUserDetails()?.id;
    if (userId) {
      this.getCartItemsByUserId(userId).
        subscribe((response) => {
          console.log(response)
          for (var i of response) {
            console.log(i)
            const num: number = i.qte;
            this.productService.getProductById(i.idProduct).subscribe((res:ProductItem) => {
              console.log(res)
              test.push([res, num]);
            });
          }
        })

    }
    console.log("hey" ,test);
    return test
  }

  getTotalPrice() {
    let total:number=0;
    for (var i of this.cart){
      total=total+(i[0].price*i[1]);
    }
    localStorage.setItem('cartItem', JSON.stringify(this.cart));
    return total;
  }
  addCartToDataBase(id:any,qte:number|undefined,product:any){
    const cartObject:FakeCart={
      idUser:id,
      qte:qte,
      idProduct:product};
    return fetch("http://localhost:8080/clients/carts/add", {
      method: 'POST',
      headers : { 'Content-Type' : 'application/json'},
      body: JSON.stringify(cartObject)
    });
  }
  getCartItemsByUserId(id:any):Observable<any>{
    return this.http.get(`http://localhost:8080/clients/carts/ByUser/test/${id}`);
  }
  async createOrder(cartItems: Array<[ProductItem, number]>,adresse:any) {
    let temp: Commande[] = [];
    const commande: FakeCommande = {
      adresse: adresse, // replace with user's address
      commandeDate: new Date(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      idClient: this.authService.getUserDetails().id
    };
    fetch("http://localhost:8080/clients/orders/add", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(commande)
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    this.commandService.getOrdersByUserId(this.authService.getUserDetails().id).subscribe((orders) => {
      temp = orders;
      console.log(orders)
      console.log(temp)
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    let c: number = 0;
    if (temp) {
      for (var i of temp) {
        if (i.id >= c) {
          console.log(i.id)
          c = i.id;
          console.log(c)
        }
      }
    }
    const detailCommandes: FakeDetailCommande[] = cartItems.map(([product, quantity]) => ({
      idProduct: product.id,
      quantity: quantity,
      idCommande: c
    }));

    detailCommandes.forEach(detail => {
      fetch("http://localhost:8080/clients/orderDetail/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(detail)
      });
    });
    window.alert("Your Order has been created!")
  }

}
