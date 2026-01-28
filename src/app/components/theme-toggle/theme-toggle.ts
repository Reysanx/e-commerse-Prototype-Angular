import { Component, inject } from '@angular/core';
import { ThemeService } from '@services/theme.service';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css',
})
export class ThemeToggle {
  themeService = inject(ThemeService);

  // Icon references for template
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
