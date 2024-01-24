import {ProductItem} from "./ProductItem";

export interface CartItem{
  //id : number | undefined;
  idUser  : any;
  qte : number | undefined;
  idProduct :any;
  product : ProductItem | undefined;
}
