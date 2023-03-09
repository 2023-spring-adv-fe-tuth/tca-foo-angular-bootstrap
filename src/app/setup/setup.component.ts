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
  ) {};


  availablePlayers: {
    name: string;
    checked: boolean;
  }[] = [];

  newPlayerName = "";

  ngOnInit(): void {
    
    this.availablePlayers = this.gameSvc.getPreviousPlayers().map(x => ({
      name: x
      , checked: false
    }));

    console.log(this.availablePlayers);
  }

  startGame = () => {

    this.gameSvc.setupInfo = {
      start: new Date().toISOString()
      , players: this.availablePlayers  
          .filter(x => x.checked)
          .map(x => x.name)
    };

    this.router.navigateByUrl("/play");
  };


  addPlayerWithValidation = () => {

    if (
      this.newPlayerName.length == 0
      || this.availablePlayers.some(x => x.name.toLocaleLowerCase() == this.newPlayerName.toLocaleLowerCase())
    )
    {
      return;
    }

    this.availablePlayers = [
      ...this.availablePlayers
      , {
        name: this.newPlayerName
        , checked: true
      }
    ];

    this.newPlayerName = "";
  }
}
