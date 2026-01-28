import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { LucideAngularModule, ArrowLeft, PackageX } from 'lucide-angular';
import { switchMap, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCard, LucideAngularModule],
    templateUrl: './category.html',
    styleUrl: './category.css'
})
export class Category {
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);

    // Icon references
    readonly ArrowLeftIcon = ArrowLeft;
    readonly PackageXIcon = PackageX;

    categoryName$ = this.route.paramMap.pipe(
        map(params => {
            const slug = params.get('category') || '';
            // Convert slug back to display name (simple approximation)
            if (slug === 'todos') return 'Todos los Productos';
            if (slug === 'ofertas') return 'Ofertas Especiales';

            return slug.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        })
    );

    products$ = this.route.paramMap.pipe(
        switchMap(params => {
            const category = params.get('category') || '';

            if (category === 'todos') {
                return this.productService.getAllProducts();
            }

            if (category === 'ofertas') {
                return this.productService.getDiscountProducts();
            }

            // Restore category name from slug for filtering
            const categoryName = category.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return this.productService.getProductsByCategory(categoryName);
        })
    );
}
