// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { AuthService } from '../service/auth.service';
interface DecodedToken {
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
   private authService = inject(AuthService);

  canActivate(): boolean {
    if (this.authService.checkToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
