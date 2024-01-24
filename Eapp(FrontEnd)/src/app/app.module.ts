import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { ListProductComponent } from './list-product/list-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { ClientComponent } from './client/client.component';
import { CreateComponent } from './create/create.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ProfilComponent } from './profil/profil.component';

import {AuthGuard} from "./auth.guard";
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CommandeComponent } from './commande/commande.component';
import { AddressModalComponent } from './address-modal/address-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    ClientComponent,
    CreateComponent,
    LoginComponent,
    ProfilComponent,
    StarRatingComponent,
    StarRatingComponent,
    CommandeComponent,
    AddressModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    FontAwesomeTestingModule,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdown,
    NgbDropdownToggle,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
