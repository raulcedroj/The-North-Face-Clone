import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'products', component: ProductsComponent
    },
    {
        path: 'admin', component: AdminComponent
    },
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];
