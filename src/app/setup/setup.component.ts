import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {

  constructor(
    private router: Router
  ) {};

  startGame = () => {
    this.router.navigateByUrl("/play");
  };
}
