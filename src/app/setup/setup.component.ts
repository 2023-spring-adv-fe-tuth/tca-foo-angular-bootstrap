import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(
    private router: Router
    , private gameSvc: GameService
  ) {}

  players: {name: string, checked: boolean}[] = [];

  ngOnInit(): void {
    this.players = this.gameSvc.getPreviousPlayers().map(x => ({
      name: x 
      , checked: false
    }));
  }

  startGame = () => {

    this.gameSvc.setupInfo = {
      start: new Date().toISOString()
      , players: this.players
        .filter(x => x.checked)
        .map(x => x.name)
    };

    this.router.navigateByUrl("/play");
  }

  newPlayerName = "";

  addNewPlayer = () => {

    // Validate...
    if (
      this.newPlayerName.length == 0
      || this.players.some(x => x.name.toLowerCase() == this.newPlayerName.toLowerCase())
    ) {
      return;
    }

    this.players = [
      ...this.players
      , {
        name: this.newPlayerName 
        , checked: true
      }
    ].sort((a, b) => a.name.localeCompare(b.name));

    this.newPlayerName = "";
  }

  get playersChosen() {
    return this.players.some(x => x.checked);
  }
}
