import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'cafetoria-authenticated';
  private readonly authenticatedSignal = signal(this.hasStoredSession());

  readonly isAuthenticated = this.authenticatedSignal.asReadonly();

  login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'KMS#2005#';

    if (isValid) {
      localStorage.setItem(this.storageKey, 'true');
      this.authenticatedSignal.set(true);
    }

    return isValid;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.authenticatedSignal.set(false);
  }

  private hasStoredSession(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}