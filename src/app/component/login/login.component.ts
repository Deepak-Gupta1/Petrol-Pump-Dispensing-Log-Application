import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  private _toster = inject(ToastrService)

  constructor(){
    localStorage.clear();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
       this._toster.success("Successfully logged in");
        localStorage.setItem('token', res.token);
        this.authService.checkToken();
        this.router.navigate(['/dispensingRecord']);
      },
      error: () => {
        this._toster.error("Invalid username or password");
      }
    });
  }

  RedirectToForm(){
    this.router.navigate(['/dispensingForm']);
  }

}
