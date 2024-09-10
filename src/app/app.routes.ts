import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'Home', canActivate: [authGuard], loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {
    path: 'categories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent), },
      { path: 'create', title: 'create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: ':id', title: 'update Category', loadComponent: () => import('./update-category/update-category.component').then(m => m.UpdateCategoryComponent) }
    ]
  },
  {
    path: 'subcategories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
      { path: ':id', title: 'update Subcategory', loadComponent: () => import('./update-subcategory/update-subcategory.component').then(m => m.UpdateSubcategoryComponent) }
    ]
  },
  { path: 'products', title: 'Products', canActivate: [authGuard], loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
  { path: 'users', title: 'Users', canActivate: [authGuard, rolesGuard], loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },

];
