import {
  Component,
  inject,
} from '@angular/core';
import { ToastService } from '../services/toast';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {

  protected readonly toastService =
    inject(ToastService);


  protected removeToast(
    id: number
  ): void {

    this.toastService.remove(id);
  }
}