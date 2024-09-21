import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { RankingComponent } from './ranking/ranking.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'game', component: GameComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'logIn', component: LogInComponent},
    {path: 'signIn', component: SignInComponent}
];
