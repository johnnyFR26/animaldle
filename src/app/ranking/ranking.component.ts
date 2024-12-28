import { GameService } from './../services/game.service';
import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/User.model';
import { LeafComponent } from '../leaf/leaf.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, LeafComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {

  ngOnInit(): void {
    this.LoadUsersGames()
  }

  games: WritableSignal<User[]> = signal([])

  constructor(private GameService: GameService) {
    effect(() => console.log('atualizado', this.games()))
  }


  LoadUsersGames() {
    this.GameService.usersGameCount().subscribe((games) => {
      this.games.set(games);
    })
  }

  LoadUserGames(userId: number) {
    this.GameService.getUserGames(userId).subscribe((games) => {
      this.games.set(games);
    })
  }

}
