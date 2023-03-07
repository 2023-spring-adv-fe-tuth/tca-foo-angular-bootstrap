import { Injectable } from '@angular/core';
import { 
  GameResult
  , calculateLeaderboard,
  addGameResult,
  getPreviousPlayers
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
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

  getPreviousPlayers = () => getPreviousPlayers(this.gameResults);
  
  setupInfo: {start: string, players: string[]} = { start: "", players: []};
}
