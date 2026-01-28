import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { LucideAngularModule, Truck, Shield, Clock, ArrowRight } from 'lucide-angular';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCard, LucideAngularModule],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home {
    private productService = inject(ProductService);

    featuredProducts$ = this.productService.getFeaturedProducts();
    discountProducts$ = this.productService.getDiscountProducts();

    // Icon references
    readonly TruckIcon = Truck;
    readonly ShieldIcon = Shield;
    readonly ClockIcon = Clock;
    readonly ArrowRightIcon = ArrowRight;
}
