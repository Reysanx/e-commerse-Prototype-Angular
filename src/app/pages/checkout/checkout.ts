import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { CartService } from '@services/cart.service';
import { LucideAngularModule, CreditCard, Truck, User, CheckCircle } from 'lucide-angular';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class Checkout {
    private fb = inject(FormBuilder);
    private toastService = inject(ToastService);
    private cartService = inject(CartService);
    private router = inject(Router);

    // Icon references
    readonly CreditCardIcon = CreditCard;
    readonly TruckIcon = Truck;
    readonly UserIcon = User;
    readonly CheckCircleIcon = CheckCircle;

    checkoutForm: FormGroup = this.fb.group({
        customer: this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, this.phoneValidator]]
        }),
        shipping: this.fb.group({
            address: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', [Validators.required, this.postalCodeValidator]],
            country: ['', Validators.required]
        }),
        payment: this.fb.group({
            cardNumber: ['', [Validators.required, this.creditCardValidator]],
            expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
            cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
        })
    });

    onSubmit(): void {
        if (this.checkoutForm.valid) {
            // Mock checkout process
            this.toastService.success('¡Pedido realizado con éxito!');
            this.cartService.clearCart();
            this.router.navigate(['/']);
        } else {
            this.checkoutForm.markAllAsTouched();
            this.toastService.error('Por favor, revisa los campos del formulario');
        }
    }

    // Custom Validators
    phoneValidator(control: AbstractControl): ValidationErrors | null {
        const valid = /^\+?[\d\s-]{9,}$/.test(control.value);
        return valid ? null : { invalidPhone: true };
    }

    postalCodeValidator(control: AbstractControl): ValidationErrors | null {
        const valid = /^\d{5}$/.test(control.value);
        return valid ? null : { invalidPostalCode: true };
    }

    creditCardValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value?.replace(/\s/g, '');
        const valid = /^\d{16}$/.test(value);
        return valid ? null : { invalidCreditCard: true };
    }
}
