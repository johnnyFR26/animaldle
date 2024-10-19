import { Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { RankingComponent } from './ranking/ranking.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game', component: GameComponent, canActivate: [authGuard]},
    {path: 'ranking', component: RankingComponent},
    {path: 'logIn', component: LogInComponent},
    {path: 'signIn', component: SignInComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
