import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

  //--------------------------------------------------------

export class AppComponent implements OnInit {

  user = {}

  //--------------------------------------------------------

  constructor(private storage: Storage, private router: Router) { }

  //--------------------------------------------------------

  ngOnInit() {

  //---Get user details
    this.storage.get('user').then((obj) => {
      console.log(obj);
      this.user = obj
    });
  }

  //--------------------------------------------------------

  //---Log out
  logout() {
    this.router.navigate(['/'])
  }

  //--------------------------------------------------------

  //---Delete account
  delete() {
    this.storage.set('user', null).then((obj) => {
      this.router.navigate(['/'])
    });
  }
}
