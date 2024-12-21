import { StorageUser } from './../lib/getLocalStorageUser';
import { Game } from '../models/Game.model';
import { GameService } from './../services/game.service';
import { AfterViewInit, Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {

  ngOnInit(): void {
    this.LoadUserGames(StorageUser().id)
  }

  games: WritableSignal<Game[]> = signal([])
  user = StorageUser()

  constructor(private GameService: GameService){
    effect(() => console.log('atualizado', this.games()))
  }

  LoadUserGames(userId: number) {
    this.GameService.getUserGames(userId).subscribe((games) => {
      this.games.set(games);
    })
  }

}
