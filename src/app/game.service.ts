import { Injectable } from '@angular/core';

interface GameResult {
  winner: string;
  players: string[];
};

export interface LeaderboardPlayer {
  name: string;
  wins: number;
  losses: number;
  avg: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  gameResults: GameResult[] = [
    {
        winner: "Tom"
        , players: ["Tom", "Taylor"]
        // , won: false

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

  getPreviousPlayers = () => {
    
    // const allPreviousPlayers = grs.map(x => x.players);
    const allPreviousPlayers = this.gameResults.flatMap(x => x.players);
    
    return [
        ...new Set(allPreviousPlayers)
    ].sort();
  };

  calculateLeaderboard = (): LeaderboardPlayer[] => {

    const gameResultsGroupedByPlayer = this.getPreviousPlayers().reduce(
        (acc, x) => acc.set(
            x
            , this.gameResults.filter(y => y.players.includes(x))
        )
        , new Map<string, GameResult[]>() 
    );

    // return gameResultsGroupedByPlayer;

    // return [...gameResultsGroupedByPlayer]; // Array of tuples of [string, GameResult[]]

    return [...gameResultsGroupedByPlayer]
        // First object with names game counts and wins...
        .map(x => ({
            name: x[0]
            , totalGames: x[1].length
            , wins: x[1].filter(y => y.winner === x[0]).length
        }))
        /// Now use wins and total games to get avg and losses
        .map(x => ({
            name: x.name
            , wins: x.wins 
            , losses: x.totalGames - x.wins
            , avg: x.wins / x.totalGames
        }))
        .sort(
            (a, b) => (a.avg * 1000 + a.wins + a.losses) > (b.avg * 1000 + b.wins + b.losses) ? -1 : 1
        )
        .map(x => ({
            ...x
            , avg: x.avg.toFixed(3)
        }))
    ;
  };

  addGameResult = (result: GameResult) => {
    this.gameResults = [
      ...this.gameResults
      , result
    ];
  }
}
