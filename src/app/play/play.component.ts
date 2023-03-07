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
    , public gameSvc: GameService
  ) {};

  endGame = (winner: string) => {
    
    console.log(
      winner
      , this.gameSvc.setupInfo.players
    );

    this.gameSvc.addGameResult({
      winner: winner
      , players: this.gameSvc.setupInfo.players
    });

    this.location.historyGo(-2);
  };
}
