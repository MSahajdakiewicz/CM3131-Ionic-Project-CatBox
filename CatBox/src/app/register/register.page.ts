import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

  //--------------------------------------------------------

export class RegisterPage implements OnInit {

  user = {}

  endpoint = 'https://api.thecatapi.com/v1/breeds';
  breedslist: any = [];

  //--------------------------------------------------------
  
  constructor(private storage: Storage, private router: Router, private http: HttpClient) { }
  
  //--------------------------------------------------------

  ngOnInit() {
    this.getAPIDetails();
  }

  //--------------------------------------------------------

  //---Get array of cat breeds from API
  getAPIDetails() {
    this.http.get(this.endpoint).subscribe(
      (response) => {
        console.log(this);
        this.breedslist = response;
        console.log(this.breedslist);
      }
    );
  }

  //--------------------------------------------------------

  //---Register user
  register() {
    console.log(this.user);
    this.storage.set('user', this.user).then((obj) => {
      this.router.navigate(['/dashboard'])
    });
  }

}
