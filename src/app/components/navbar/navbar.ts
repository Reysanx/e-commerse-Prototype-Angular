import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ShoppingCart, User, Menu, ChevronDown } from 'lucide-angular';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { CartService } from '@services/cart.service';
import { CATEGORIES } from '@models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideAngularModule,
    ThemeToggle
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  cartService = inject(CartService);

  // Icon references
  readonly SearchIcon = Search;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly UserIcon = User;
  readonly MenuIcon = Menu;
  readonly ChevronDownIcon = ChevronDown;

  searchQuery = '';
  categories = CATEGORIES;
  showCategoryDropdown = false;

  handleSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  navigateToCategory(category: string): void {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/category', slug]);
    this.showCategoryDropdown = false;
  }

  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  closeCategoryDropdown(): void {
    setTimeout(() => {
      this.showCategoryDropdown = false;
    }, 200);
  }
}
