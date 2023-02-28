import { Component, OnInit } from '@angular/core';
import { LeaderboardPlayer } from '../front-end-model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private gameSvc: GameService
  ) {}

  leaderboardData: LeaderboardPlayer[] = [];

  ngOnInit(): void {
    this.leaderboardData = this.gameSvc.calculateLeadboard();
    console.log(this.leaderboardData);
  }
}
