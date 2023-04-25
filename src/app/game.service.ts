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

  addGameResult = (resultToAdd: GameResult) => {
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
