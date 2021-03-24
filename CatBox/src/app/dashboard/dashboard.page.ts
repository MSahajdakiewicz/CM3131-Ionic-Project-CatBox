import { Component, OnInit } from '@angular/core';

// Remeber the Imports
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  user = {}

  catFact: any;
  endpoint = 'https://api.thecatapi.com/v1/images/search';
  randomImage: any;
  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    // Get the user object
    this.storage.get('user').then((obj) => {
      console.log(obj);
      this.user = obj
    });

    console.log("Cat Fact:")
    this.http.get('https://catfact.ninja/fact?max_length=1400').subscribe((response) => {
      console.log(response);
      this.catFact = response;
    });

    this.http.get('http://aws.random.cat/meow').subscribe((response) => {
      console.log(response);
      this.randomImage = response;
    });
  }

  loadNextImage(){
    this.http.get('http://aws.random.cat/meow').subscribe((response) => {
      console.log(response);
      this.randomImage = response;
    });
  }

loadNextFact(){
  this.http.get('https://catfact.ninja/fact?max_length=1400').subscribe((response) => {
      console.log(response);
      this.catFact = response;
    });
}

}
