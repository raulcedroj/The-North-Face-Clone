import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/products/form.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent {
	productForm!: FormGroup;

	constructor(private formService: FormService, private fb: FormBuilder, private router: Router) {
		this.productForm = this.fb.group({
			referenceNumber: new FormControl('', [Validators.required, Validators.maxLength(25)]),
			productName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
			price: new FormControl('', [Validators.required, Validators.min(1)]),
			description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
			productType: new FormControl('', [Validators.required]),
			isOnSale: new FormControl(''),
			productImage: new FormControl('', [Validators.required])
		});
	}

	onSubmit(): void {
		const productNameUpper = this.productForm.value.productName.toUpperCase();

		this.productForm.patchValue({ productName: productNameUpper });
		
		if (this.productForm.valid) {
			const product = this.productForm.value;
			this.formService.addProduct(product);
			this.productForm.reset();
			this.router.navigate(['/products']);
		}
	}
}
