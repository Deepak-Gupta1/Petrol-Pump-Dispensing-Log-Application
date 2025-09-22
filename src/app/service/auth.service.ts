import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private router = inject(Router);

  private authStatus = new BehaviorSubject<boolean>(false);

  authStatus$ = this.authStatus.asObservable();

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiEndPoint}/Auth/login`, { username, password });
  }

  public checkToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded: any = jwtDecode(token);
    if(decoded.userName){
      this.authStatus.next(true);
      return true;
    }
    this.authStatus.next(false);
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/']);
  }

}
