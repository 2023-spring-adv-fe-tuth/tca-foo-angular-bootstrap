import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  constructor(
    private router: Router  
  ) {};

  gameOver = () => {
    this.router.navigateByUrl("/");
  };
}
