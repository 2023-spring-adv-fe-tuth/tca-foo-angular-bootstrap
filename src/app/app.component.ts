import { Component, OnInit } from '@angular/core';
import * as localforage from 'localforage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'tca-foo-angular-bootstrap';

  emailKey = "";

  async ngOnInit() {
    console.log("ngOnInit");
    this.emailKey = await localforage.getItem("emailKey") ?? "";
  }

  saveEmailKey = async () => {
    try {
      await localforage.setItem("emailKey", this.emailKey)
    }
    catch (err){
      console.error(err);
    }
  };
}
