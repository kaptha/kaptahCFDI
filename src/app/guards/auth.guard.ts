import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const isAuthenticated = await this.usersService.authActivate();

      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error during authentication:', error);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

