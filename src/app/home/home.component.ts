import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { MenubarComponent } from '../menubar/menubar.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    MenubarComponent,
    AddProductComponent,
    ProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
