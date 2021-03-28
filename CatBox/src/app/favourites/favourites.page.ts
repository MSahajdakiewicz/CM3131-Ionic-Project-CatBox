import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})

  //--------------------------------------------------------

export class FavouritesPage implements OnInit {

  user = {}

  breedslist: any = [];
  catObject: any = {};
  endpoint = 'https://api.thecatapi.com/v1/breeds';
  catImageURL: string = "";

  buttonIcon: string = "heart";

  //--------------------------------------------------------

  constructor(private storage: Storage, private http: HttpClient, public toastController: ToastController) { }

  //--------------------------------------------------------

  ngOnInit() {
    this.getAPIDetails();

  //---Get user details 
    this.storage.get('user').then((obj) => {
      console.log(obj);
      this.user = obj
    });

  //---Attempt to create catObject by comparing user.favBreed with breed name from API object
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

  //---Toggle favourite icon 
  async toggleIcon(getIcon: string) {

      if (this.buttonIcon === 'heart-outline') {
        this.buttonIcon = "heart";
        const toast = await this.toastController.create({
          message: 'Added to Favourites',
          duration: 2000,
          cssClass: 'my-toast',
        });
        toast.present();
      }

      else if (this.buttonIcon === 'heart') {
        this.buttonIcon = "heart-outline";
        const toast = await this.toastController.create({
          message: 'Removed from Favourites',
          duration: 2000,
          cssClass: 'my-toast',
        });
        toast.present();
      }
   }
   
  }