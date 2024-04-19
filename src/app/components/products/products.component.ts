import { Component } from '@angular/core';
import { FormService } from '../../services/products/form.service';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = [];

  constructor(private formService: FormService) { 
    this.products = this.formService.getProducts();
  }

  

}
