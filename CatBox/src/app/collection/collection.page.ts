import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  user = {}
  catObject: any = {};
  endpoint = 'https://api.thecatapi.com/v1/breeds';
  breedslist: any = [];
  catImageURL: string = "";
  constructor(private storage: Storage, private http: HttpClient) { }

  ngOnInit() {
    this.getAPIDetails();

    this.storage.get('user').then((obj) => {
      console.log(obj);
      this.user = obj
    });

    this.storage.get('user').then((user) => {
      if (user) {
        for (let aCatObject of this.breedslist){
        if (aCatObject.name == user.favBreed) {
          this.catObject = aCatObject;
        }
        this.catImageURL = this.catObject.image.url;
      }
      }
    });
  
  }
  getAPIDetails(){
    this.http.get(this.endpoint).subscribe(
      (response) => {
        console.log(this);
        this.breedslist = response;
        console.log(this.breedslist);
      }
    );
  }
  }
