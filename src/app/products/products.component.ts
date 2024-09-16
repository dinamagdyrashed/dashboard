import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: any;
  products: any[] = [];
  productImage: string = '';
  id: string = '';
  pagination: any = {};
  page: number = 1;
  search: string = '';
  loading: boolean = false;
  isModalVisible: boolean = false;

  constructor(
    private _AuthService: AuthService,
    private _ProductsService: ProductsService
  ) {}

  loadProducts() {
    this.loading = true;
    this.subscription = this._ProductsService
      .getAllProducts(50, this.page, 'category subcategory name', this.search)
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
          this.loading = false;
        },
        error: (err) => {},
      });
  }
  openModal(id: string) {
    this.isModalVisible = true;
    this.id = id;
  }
  closeModal() {
    this.isModalVisible = false;
  }
  deleteProduct() {
    this.isModalVisible = false;

    this.loading = true;

    this._ProductsService.deleteProduct(this.id).subscribe({
      next: (res) => {
        this.loadProducts();
        this.loading = false;
      },
      error: (err) => {},
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  searchData(data: string) {
    this.search = data;
    this.loadProducts();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ProductsService.productsImages;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
