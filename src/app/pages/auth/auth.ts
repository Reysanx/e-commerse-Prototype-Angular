import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule, User, Mail, Lock, ArrowRight } from 'lucide-angular';
import { ToastService } from '@services/toast.service';

type AuthMode = 'login' | 'register';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './auth.html',
    styleUrl: './auth.css'
})
export class Auth {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private toastService = inject(ToastService);

    // Icon references
    readonly UserIcon = User;
    readonly MailIcon = Mail;
    readonly LockIcon = Lock;
    readonly ArrowRightIcon = ArrowRight;

    mode = signal<AuthMode>('login');

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
    });

    switchMode(newMode: AuthMode): void {
        this.mode.set(newMode);
        this.loginForm.reset();
        this.registerForm.reset();
    }

    onLogin(): void {
        if (this.loginForm.valid) {
            // Mock login
            this.toastService.success('¡Bienvenido de nuevo!');
            this.router.navigate(['/']);
        } else {
            this.loginForm.markAllAsTouched();
            this.toastService.error('Por favor, completa todos los campos correctamente');
        }
    }

    onRegister(): void {
        if (this.registerForm.valid) {
            const { password, confirmPassword } = this.registerForm.value;

            if (password !== confirmPassword) {
                this.toastService.error('Las contraseñas no coinciden');
                return;
            }

            // Mock registration
            this.toastService.success('¡Cuenta creada exitosamente!');
            this.router.navigate(['/']);
        } else {
            this.registerForm.markAllAsTouched();
            this.toastService.error('Por favor, completa todos los campos correctamente');
        }
    }
}
