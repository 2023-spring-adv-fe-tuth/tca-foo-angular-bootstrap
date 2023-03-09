import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(
    private location: Location
    , private gameSvc: GameService
  ) {};

  playersInGame: string[] = [];

  ngOnInit(): void {
    console.log(this.gameSvc.setupInfo);
    this.playersInGame = this.gameSvc.setupInfo.players;
  }

  endGame = (winner: string) => {
    
    this.gameSvc.addGameResult({
      winner: winner
      , players: this.gameSvc.setupInfo.players
    });

    this.location.historyGo(-2);
  };
}
