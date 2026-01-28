import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Home, Search } from 'lucide-angular';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './not-found.html',
    styleUrl: './not-found.css'
})
export class NotFound {
    readonly HomeIcon = Home;
    readonly SearchIcon = Search;
}
