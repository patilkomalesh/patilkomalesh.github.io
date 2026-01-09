import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home').then(m => m.Home) },
  { path: 'events', loadComponent: () => import('./components/events/events').then(m => m.Events) },
  { path: 'gallery', loadComponent: () => import('./components/gallery/gallery').then(m => m.Gallery) },
  { path: 'rsvp', loadComponent: () => import('./components/rsvp/rsvp').then(m => m.Rsvp) },
  // fallback
  { path: '**', redirectTo: '' }
];
