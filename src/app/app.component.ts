import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tca-foo-angular-bootstrap';


  async ngOnInit() {

    try {
      this.emailAddress = await localforage.getItem("emailAddress") ?? "";
    }
    catch (err) {
      console.error(err);
    }
  }

  emailAddress = "";

  saveEmailAddress = async () => {
    try {
      await localforage.setItem(
        "emailAddress"
        , this.emailAddress
      );
    }
    catch (err) {
      console.error(err);
    }
  };
}
