import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  isLogin=false;

  constructor() {
    this.authService.authStatus$.subscribe(isAuth => {
      this.isLogin=isAuth;
    });
  }

  RedirectToForm() {
    this.router.navigate(['/dispensingForm']);
  }

  LogOut(){
    this.authService.logout();
  }

}
