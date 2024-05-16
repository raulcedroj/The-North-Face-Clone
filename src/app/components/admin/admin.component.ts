import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/products/form.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../interfaces/products';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent {
	productForm!: FormGroup;
	products: Product[] = [];

	constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private formService: FormService) {
/*
		formService.createProduct(this.productTest).subscribe(data => {
			this.test_post = data.nombre;
		}, error => this.error2 = error);*/
	}


	ngOnInit(): void {

		this.productForm = this.fb.group({
			referencia: new FormControl('', [Validators.required, Validators.maxLength(25)]),
			nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			precio: new FormControl('', [Validators.required, Validators.min(1)]),
			descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)]),
			categoria: new FormControl('', [Validators.required]),
			oferta: new FormControl(''),
			imagen: new FormControl('', [Validators.required])
		});

	}


	onSubmit(): void {
		if (this.productForm.valid) {
			const product: Product = this.productForm.value;
			//this.productService.addProduct(product);
			console.log(product);
			this.formService.createProduct(this.productForm.value).subscribe();
			this.productForm.reset();
		} else {
			console.log('Not valid :(')
		}
	}
}
