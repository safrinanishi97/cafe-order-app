import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');

  protected login(event: SubmitEvent): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const username = String(formData.get('username') ?? '');
    const password = String(formData.get('password') ?? '');

    if (!this.authService.login(username, password)) {
      this.errorMessage.set('Incorrect username or password.');
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/');
  }
}