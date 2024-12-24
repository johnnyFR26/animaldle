import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'game',
    loadComponent: () =>
      import('./game/game.component').then((m) => m.GameComponent),
    canActivate: [authGuard],
  },
  {
    path: 'ranking',
    loadComponent: () =>
      import('./ranking/ranking.component').then((m) => m.RankingComponent),
  },
  {
    path: 'logIn',
    loadComponent: () =>
      import('./log-in/log-in.component').then((m) => m.LogInComponent),
  },
  {
    path: 'signIn',
    loadComponent: () =>
      import('./sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
