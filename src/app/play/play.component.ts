import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  constructor(
    private loc: Location
  ) {};

  gameOver = () => {
    this.loc.historyGo(-2);
  };
}
