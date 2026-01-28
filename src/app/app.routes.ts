import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Tech Cart Quest - Tu tienda de electrónica online'
  },
  {
    path: 'category/:category',
    loadComponent: () => import('./pages/category/category').then(m => m.Category),
    title: 'Categoría - Tech Cart Quest'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
    title: 'Producto - Tech Cart Quest'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    title: 'Carrito de Compras - Tech Cart Quest'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    title: 'Finalizar Compra - Tech Cart Quest'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth),
    title: 'Iniciar Sesión - Tech Cart Quest'
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then(m => m.Search),
    title: 'Búsqueda - Tech Cart Quest'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 - Página no encontrada'
  }
];
