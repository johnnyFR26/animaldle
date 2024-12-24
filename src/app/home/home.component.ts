import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeafComponent } from '../leaf/leaf.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LeafComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  StartGame() {
    console.log('Starting...')
  }
}