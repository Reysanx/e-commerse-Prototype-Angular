import { Injectable, effect, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Private writable signal
  private themeSignal = signal<Theme>(this.getInitialTheme());

  // Public readonly signal
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    // Effect runs whenever theme changes
    if (this.isBrowser) {
      effect(() => {
        const currentTheme = this.themeSignal();
        this.applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
      });
    }
  }

  toggleTheme(): void {
    this.themeSignal.update(current => current === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
  }

  private getInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    const stored = localStorage.getItem('theme') as Theme;
    if (stored) {
      // Apply theme immediately to prevent flash
      this.applyTheme(stored);
      return stored;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    this.applyTheme(systemTheme);
    return systemTheme;
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
}
