import { Component, OnInit } from '@angular/core';
import { LeaderboardPlayer } from '../front-end-model';
import { GameService } from '../game.service';
import { durationFormatter } from 'human-readable';

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

  shortestGame = "n/a";
  longestGame = "n/a";

  format = durationFormatter();

  ngOnInit(): void {
    this.leaderboardData = this.gameSvc.calculateLeadboard();
    console.log(this.leaderboardData);

    this.shortestGame = this.format(this.gameSvc.getShortestGameDuration()) as string;
    this.longestGame = this.format(this.gameSvc.getLongestGameDuration()) as string;
  }
}
