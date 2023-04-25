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

const APP_NAME = "tca-foo-angular-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  gameResults: GameResult[] = [];

  calculateLeadboard = () => {
    return calculateLeaderboard(this.gameResults);
  };

  calculateAvgGameTimes = () => {
    return getAverageGameDurationByPlayerCount(this.gameResults);
  };

 emailKey = "";

 setEmailKey = (key: string) => {
  this.emailKey = key;
 };

  addGameResult = async (resultToAdd: GameResult) => {

    // Save this one game result to the cloud.
    if (this.emailKey.length > 0) {
      await saveGameToCloud( 
        this.emailKey
        , APP_NAME
        , resultToAdd.start
        , resultToAdd
      );
    }

    // Optimistically adding it to the stored game results in the service.
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

  loadGamesFromCloud = async () => {
    if (this.emailKey.length > 0) {
      this.gameResults = await loadGamesFromCloud(
        this.emailKey
        , APP_NAME
      );
    }
  };
}
