import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '@models/product.model';
import { PRODUCTS } from '@data/products.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = PRODUCTS;

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(
      this.products.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
      )
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return of(
      this.products.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery)
      )
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.isNew));
  }

  getDiscountProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.discount));
  }
}
