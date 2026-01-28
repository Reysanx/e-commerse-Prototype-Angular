import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { LucideAngularModule, ArrowLeft, SearchX } from 'lucide-angular';
import { switchMap, map } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, RouterLink, ProductCard, LucideAngularModule],
    templateUrl: './search.html',
    styleUrl: './search.css'
})
export class Search {
    private route = inject(ActivatedRoute);
    private productService = inject(ProductService);

    // Icon references
    readonly ArrowLeftIcon = ArrowLeft;
    readonly SearchXIcon = SearchX;

    searchQuery$ = this.route.queryParamMap.pipe(
        map(params => params.get('q') || '')
    );

    products$ = this.route.queryParamMap.pipe(
        switchMap(params => {
            const query = params.get('q') || '';
            return this.productService.searchProducts(query);
        })
    );
}
