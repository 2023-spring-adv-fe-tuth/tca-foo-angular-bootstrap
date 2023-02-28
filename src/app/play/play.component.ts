import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  constructor(
    private location: Location
    , private gameSvc: GameService
  ) {};

  endGame = () => {
    
    this.gameSvc.addGameResult({
      winner: "Larry"
      , players: ["Larry", "Curly", "Moe"]
    });

    this.location.historyGo(-2);
  };
}
