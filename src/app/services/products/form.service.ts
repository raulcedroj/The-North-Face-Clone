import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  products: Product[] = [];

  constructor() { }

  addProduct(product: Product): void{
    this.products.push(product);
    console.log(this.products);
  }

  getProducts(): Product[]{
    return this.products;
  }
}
