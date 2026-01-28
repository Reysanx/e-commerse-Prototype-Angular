import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '@models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private writable signal for items
  private itemsSignal = signal<CartItem[]>([]);

  // Public readonly signal for items
  readonly items = this.itemsSignal.asReadonly();

  // Computed signals for derived state
  readonly totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addItem(newItem: Omit<CartItem, 'quantity'>): void {
    this.itemsSignal.update(items => {
      const existingItem = items.find(item => item.id === newItem.id);
      if (existingItem) {
        return items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...newItem, quantity: 1 }];
    });
  }

  removeItem(id: string): void {
    this.itemsSignal.update(items => items.filter(item => item.id !== id));
  }

  updateQuantity(id: string, delta: number): void {
    this.itemsSignal.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}
