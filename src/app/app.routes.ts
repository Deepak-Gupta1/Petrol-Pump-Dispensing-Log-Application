import { Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent) },
    { path: 'dispensingForm', loadComponent: () => import('./component/dispensing-form/dispensing-form.component').then((m)=>m.DispensingFormComponent),canActivate: [AuthGuard] },
    { path: 'dispensingRecord', loadComponent: () => import('./component/petrol-dispensing-record/petrol-dispensing-record.component').then((m)=>m.PetrolDispensingRecordComponent),canActivate: [AuthGuard]}
];
