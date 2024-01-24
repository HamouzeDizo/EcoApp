import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, RoutesRecognized} from "@angular/router";
import {ProfilComponent} from "./profil/profil.component";
import {LoginComponent} from "./login/login.component";
import {CreateComponent} from "./create/create.component";
import {ClientComponent} from "./client/client.component";
import {CartDetailsComponent} from "./cart-details/cart-details.component";
import {ListProductComponent} from "./list-product/list-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CommandeComponent} from "./commande/commande.component";


const routes:Routes = [
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'products', component: ListProductComponent},
  {path: 'products/panier', component: CartDetailsComponent},
  {path: 'client', component: ClientComponent},
  {path: 'signup', component: CreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'orders', component: CommandeComponent},
  {path: '', redirectTo: '/products', pathMatch:'full'},
]
@NgModule({
  imports: [
    [RouterModule.forRoot(routes)],
    CommonModule
  ],
  exports:[RouterModule]

})
export class AppRoutingModule { }
