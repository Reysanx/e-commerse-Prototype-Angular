import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastr = inject(ToastrService);

  success(message: string, title?: string): void {
    this.toastr.success(message, title, {
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      progressBar: true,
    });
  }

  error(message: string, title?: string): void {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-right',
      timeOut: 4000,
      progressBar: true,
    });
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title, {
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      progressBar: true,
    });
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title, {
      positionClass: 'toast-bottom-right',
      timeOut: 3500,
      progressBar: true,
    });
  }
}
