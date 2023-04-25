import { Component, OnInit } from '@angular/core';
import { LeaderboardPlayer } from '../front-end-model';
import { GameService } from '../game.service';
import { durationFormatter } from 'human-readable';
import * as localforage from 'localforage';

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

  avgGameTimeData: {
    playerCount: number;
    avgGameDuration: string;
  }[] = [];

  shortestGame = "n/a";
  longestGame = "n/a";
  coolThingPercentDisplay = "n/a";

  format = durationFormatter();


  init = async () => {

    try {

      this.emailAddress = await localforage.getItem("emailAddress") ?? "";

      if (this.emailAddress.length > 0) {
        this.gameSvc.setEmailKey(this.emailAddress);
        await this.gameSvc.loadGamesFromCloud();
      }

      this.leaderboardData = this.gameSvc.calculateLeadboard();
      console.log(this.leaderboardData);

      this.avgGameTimeData = this.gameSvc.calculateAvgGameTimes().map(x => ({
        ...x
        , avgGameDuration: this.format(x.avgGameDuration) as string
      }));
      console.log(this.avgGameTimeData);

      const shortest = this.gameSvc.getShortestGameDuration();
      this.shortestGame = Number.isInteger(shortest)
        ? this.format(shortest) as string
        : "n/a"
      ;

      const longest = this.gameSvc.getLongestGameDuration();
      this.longestGame = Number.isInteger(longest)
        ? this.format(longest) as string
        : "n/a"
      ;
    
      this.coolThingPercentDisplay = (this.gameSvc.getPercentageOfGamesThatReallyCoolThingHappened() * 100).toFixed(2) +"%";
    }

  catch (err) {
    console.error(err);
  }

};

  async ngOnInit() {
    await this.init();
}

  emailAddress = "";

  saveEmailAddress = async () => {
    try {
      await localforage.setItem(
        "emailAddress"
        , this.emailAddress
      );

      this.gameSvc.setEmailKey(this.emailAddress);
      this.init();
    }
    catch (err) {
      console.error(err);
    }
  };
}
