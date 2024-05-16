import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/products/form.service';
import { Product } from '../../interfaces/products';

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [],
	templateUrl: './products.component.html',
	styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

	productList: Product[] = [];

	constructor(private productService: FormService) {

	}

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts() {
		this.productService.getProducts().subscribe({

			next: (result) => {
				this.productList = result.productos;
			},
			error: (error) => {
				console.error(error);
			}
		});







		/*
		products: Product[] = [];
		
		constructor(private formService: FormService) { 
			this.products = this.formService.getProducts();
		}*/



	}
}
