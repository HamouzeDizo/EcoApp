import {Component, OnInit} from '@angular/core';
import {ProductItem} from "../Model/ProductItem";
import {DataService} from "../data.service";
import {CartService} from "../cart.service";

// @ts-ignore
import Array from "$GLOBAL$";
// @ts-ignore
import HTMLInputElement from "$GLOBAL$";
import {ProductService} from "../product.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: any;
  filteredProducts: any;
  searchText: string = '';
  selectedCategory: string | null = null;

  userName: string | undefined;
  buttonWidth: number | undefined;

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  logout(): void {
    this.authService.logout();
  }

  getSate(product: ProductItem): string {
    return 'en Stock';
  }

  getColor(product: ProductItem): string {
    return 'green';
  }

  selectProduct(product: ProductItem) {
    this.dataService.setProduct(product);
    console.log(product);
  }

  add(product: ProductItem, qte: HTMLInputElement) {
    const q: number = parseInt(qte.value, 10);
    if (q > 0) {
      this.cartService.addToCart(product, q);
      window.alert('Product added to cart!');
    }
  }




  ngOnInit(): void {
    this.productService
      .getAll().subscribe((response) => (
        this.products = this.filteredProducts = response.products));
    const userDetails = this.authService.getUserDetails();
    if (userDetails) {
      this.userName = userDetails.nom+" "+userDetails.prenom;
      this.calculateButtonWidth();
    }
  }

  search(): void {
    if (this.searchText) {
      this.productService.getAll().subscribe((response) => {
        this.filteredProducts = response.products.filter((product: any) =>
          product.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
        console.log('Search Results:', this.filteredProducts);
      });
    } else {
      this.productService.getAll().subscribe((response) => {
        this.products = this.filteredProducts = response.products;
      });
    }
  }


  onCategoryChange() {
    if (this.selectedCategory=="all"){
      this.productService
        .getAll().subscribe((response) => (
        this.products = this.filteredProducts = response.products));
      return;
    }
    this.productService.getProductsByCat(this.selectedCategory).subscribe((res: any) => {
      console.log('Category changed:', res);
      this.filteredProducts=res.products;
    });

  }
  calculateDynamicWidth(): number {
    const baseWidth = 25;
    const selectedCategory = this.selectedCategory || 'Categories';
    if (selectedCategory=='Categories'){
      return 7 + selectedCategory.length * 8;
    }
    return baseWidth + selectedCategory.length * 8;
  }
  calculateButtonWidth(): void {
    const minWidth = 80; // Minimum width for the button
    const maxWidth = 200; // Maximum width for the button
    const factor = 8; // Adjust this factor based on your needs

    const length = this.userName?.length;
    if (length !== undefined) {
      this.buttonWidth = Math.min(length * factor, maxWidth);
    }
  }


}
