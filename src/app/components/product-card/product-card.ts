import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, Heart } from 'lucide-angular';
import { CartService } from '@services/cart.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) price!: number;
  @Input() originalPrice?: number;
  @Input({ required: true }) image!: string;
  @Input({ required: true }) category!: string;
  @Input() isNew?: boolean;
  @Input() discount?: number;

  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  // Icon references for template
  readonly ShoppingCartIcon = ShoppingCart;
  readonly HeartIcon = Heart;

  handleAddToCart(event: Event): void {
    event.preventDefault();
    this.cartService.addItem({
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
    });
    this.toastService.success('Producto añadido al carrito');
  }
}
