import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FormService {
	//products: Product[] = [];

	API_URL = 'http://localhost:3000/api/productos';
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private httpClient: HttpClient) { }


	getProducts(): Observable<any> {
		return this.httpClient.get(this.API_URL).pipe(res => res);
	}

	createProduct(product: Product): Observable<Product> {
        console.log(product)
        return this.httpClient.post<Product>(this.API_URL, JSON.stringify(product), this.httpOptions).pipe(res=> res);
    }

	/*
		addProduct(product: Product): void {
			this.products.push(product);
			console.log(this.products);
		}
	
		getProducts(): Product[] {
			return this.products;
		}
	}
	*/
}