import {Component, OnInit} from '@angular/core';
import {CommandeService} from "../commande.service";
import {AuthService} from "../auth.service";
import {Commande} from "../Model/Commande";
import {DetailCommande} from "../Model/DetailCommade";
import {ProductItem} from "../Model/ProductItem";
import {ProductService} from "../product.service";
import {forkJoin} from "rxjs";
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  orders: any[] = [];
  visible = false;
  expandedOrders: Set<number> = new Set<number>();
  productMap: { [id: number]: ProductItem } = {};
  expandedOrderIds: number[] = [];

  constructor(private commandeService: CommandeService,
              private authService:AuthService,
              private productService:ProductService,
              private dialog: MatDialog)
  {}

  ngOnInit(): void {
    const userId = this.authService.getUserDetails().id;
    this.commandeService.getOrdersByUserId(userId).subscribe((orders) => {
      const detailRequests = orders.map((order: { id: any; }) =>
        this.commandeService.getOrderDetailByCommandeId(order.id)
      );

      forkJoin(detailRequests).subscribe(details => {
        orders.forEach((order: { details: DetailCommande; }, index: string | number) => {
          // @ts-ignore
          order.details = details[index];
          console.log(order.details);
          this.populateProductMap(order.details);
        });
      });

      this.orders = orders;
    });
  }
  getTotalePrice(c:Commande){
    var counter=0;
    for (const i of c.details){
      counter+=this.getProductById(i).price*i.quantity;
    }
    return counter;
  }
  cancelOrder(commande : Commande){
    this.commandeService.deleteCommande(commande.id)
    window.location.reload();
  }

  toggleOrderDetails(orderId: number) {
    const index = this.expandedOrderIds.indexOf(orderId);
    if (index !== -1) {
      // Order is expanded, collapse it
      this.expandedOrderIds.splice(index, 1);
    } else {
      // Order is collapsed, expand it
      this.expandedOrderIds.push(orderId);
    }
  }

// Add this method to check if the order is expanded
  isOrderExpanded(orderId: number): boolean {
    return this.expandedOrderIds.includes(orderId);
  }
  toggleCollapse(): void {
    this.visible = !this.visible;
  }
  populateProductMap(detail: any): void {
    for (const item of detail) {
      if (!this.productMap[item.idProduct]) {
        this.productService.getProductById(item.idProduct).subscribe((product: ProductItem) => {
          this.productMap[item.idProduct] = product;
        });
      }
    }
  }

  getProductById(detail: DetailCommande): ProductItem {
    return this.productMap[detail.idProduct] || {} as ProductItem;
  }




}
