import { Injectable } from '@angular/core';
import { 
  GameResult
  , calculateLeaderboard
  , addGameResult
  , getPreviousPlayers
  , getShortestGameDuration
  , getLongestGameDuration
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:45:30.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:42:00.000Z"
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:47:00.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:41:48.000Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:50:00.000Z"
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:43:12.000Z"
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-03-22T20:40:00.000Z"
      , end: "2023-03-22T20:47:13.000Z"
  }
];

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  gameResults: GameResult[] = hardcodedGameResults;

  calculateLeadboard = () => {
    return calculateLeaderboard(this.gameResults);
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
}
