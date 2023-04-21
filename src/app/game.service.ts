import { Injectable } from '@angular/core';
import { 
  GameResult
  , calculateLeaderboard
  , addGameResult
  , getPreviousPlayers
  , getShortestGameDuration
  , getLongestGameDuration
  , getAverageGameDurationByPlayerCount
  , getPercentageOfGamesThatReallyCoolThingHappened
} from './front-end-model';

import { saveGameToCloud, loadGamesFromCloud } from './tca-cloud-api';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  gameResults: GameResult[] = [];

  emailKey = "";

  setEmailKey = async (ek: string)=> {
    this.emailKey = ek;
    await this.loadGameResults();
  }

  loadGameResults = async () => {

    console.log("loadGameResults", this.emailKey);

    // Bail if no key...
    if (this.emailKey.length == 0){
      return;
    }

    try {
      this.gameResults = await loadGamesFromCloud(
        this.emailKey 
        , "tca-foo-angular-bootstrap"
      );
    }

    catch (err) {
      console.error(err);
    }
  };

  calculateLeadboard = () => {
    return calculateLeaderboard(this.gameResults);
  };

  calculateAvgGameTimes = () => {
    return getAverageGameDurationByPlayerCount(this.gameResults);
  };

  addGameResult = async (resultToAdd: GameResult) => {

    if (this.emailKey.length > 0) {
      await saveGameToCloud(
        this.emailKey 
        , "tca-foo-angular-bootstrap"
        , resultToAdd.end
        , resultToAdd
      );
    }

    this.gameResults = addGameResult(this.gameResults, resultToAdd);
  };

  getPreviousPlayers = () => {
    return getPreviousPlayers(this.gameResults);
  }

  setupInfo: {
    start: string
    , players: string[]
  } = {
    start: ""
    , players: []
  };

  getShortestGameDuration = () => getShortestGameDuration(this.gameResults);
  getLongestGameDuration = () => getLongestGameDuration(this.gameResults);

  getPercentageOfGamesThatReallyCoolThingHappened = () => getPercentageOfGamesThatReallyCoolThingHappened(this.gameResults);
}
