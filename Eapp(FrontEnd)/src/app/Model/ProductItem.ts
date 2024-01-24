
export class ProductItem {
  id : number;
  title : string;
  price : number;
  rating: number;
  stock: number;
  brand: string;
  description : string;
  thumbnail: string;
  images : Array<string>;
  discountPercentage: number;
  category: string;
  disponibilite : boolean=true;


  constructor(id: number, title: string,
              price: number, rating: number, stock: number,
              brand: string, description: string, thumbnail: string,
              images: Array<string>, discountPercentage: number,
              category: string, disponibilite: boolean) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.rating = rating;
    this.stock = stock;
    this.brand = brand;
    this.description = description;
    this.thumbnail = thumbnail;
    this.images = images;
    this.discountPercentage = discountPercentage;
    this.category = category;
    this.disponibilite = true;
  }
}
