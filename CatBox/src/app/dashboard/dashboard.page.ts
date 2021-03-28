import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

  //--------------------------------------------------------

export class DashboardPage implements OnInit {

  user = {}

  catFact: any;
  randomImage: any;

  //--------------------------------------------------------
  
  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  //--------------------------------------------------------

  ngOnInit() {

  //---Get user details
    this.storage.get('user').then((obj) => {
      console.log(obj);
      this.user = obj
    });

  //---Load random image
    this. loadNextImage();

  //---Load random fact
    this.loadNextFact();

  }

  //--------------------------------------------------------

  //---Get random image from API
  loadNextImage() {
    this.http.get('http://aws.random.cat/meow').subscribe((response) => {
      console.log(response);
      this.randomImage = response;
    });
  }

  //--------------------------------------------------------

  //---Get random fact from API
  loadNextFact() {
    this.http.get('https://catfact.ninja/fact?max_length=1400').subscribe((response) => {
      console.log(response);
      this.catFact = response;
    });
  }

}
