import { Component, OnInit } from '@angular/core';
import { GameService, LeaderboardPlayer } from '../game.service';

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

  ngOnInit() {

    this.leaderboardData = this.gameSvc.calculateLeaderboard();
    console.log(this.leaderboardData);
  }
}
