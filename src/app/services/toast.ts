import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private readonly toastList =
    signal<Toast[]>([]);

  readonly toasts =
    this.toastList.asReadonly();


  success(message: string): void {
    this.show(message, 'success');
  }


  error(message: string): void {
    this.show(message, 'error');
  }


  info(message: string): void {
    this.show(message, 'info');
  }


  warning(message: string): void {
    this.show(message, 'warning');
  }


  private show(
    message: string,
    type: ToastType
  ): void {

    const id = Date.now();

    const toast: Toast = {
      id,
      message,
      type,
    };

    this.toastList.update(current => [
      ...current,
      toast,
    ]);


    setTimeout(() => {

      this.remove(id);

    }, 3000);
  }


  remove(id: number): void {

    this.toastList.update(
      current =>
        current.filter(
          toast => toast.id !== id
        )
    );
  }
}