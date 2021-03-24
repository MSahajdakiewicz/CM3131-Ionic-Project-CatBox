import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Remember the Imports
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  user = {}
  endpoint = 'https://api.thecatapi.com/v1/breeds';
  count: number = 0; //To check that getAPIDetails() is being called
  breedslist: any = [];
  


  constructor(private storage: Storage, private router: Router, private http: HttpClient){

  }

  ngOnInit() {
    this.getAPIDetails();
    console.log(this.count);
  }

  getAPIDetails(){
    this.http.get(this.endpoint).subscribe(
      (response) => {
        console.log(this);
        this.breedslist = response;
        console.log(this.breedslist);
        this.count++;
      }
    );
  }

  register(){
    console.log(this.user);
    // Can do validation if needed
    this.storage.set('user', this.user).then((obj) => {
      this.router.navigate(['/dashboard'])
    });



  }



}
