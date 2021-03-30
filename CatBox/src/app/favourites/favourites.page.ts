import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

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

  buttonIcon: string = "paw";

  savedCats: any = [];

  selectedCat?: any = {};
  //--------------------------------------------------------

  constructor(private storage: Storage, private http: HttpClient, public toastController: ToastController,  private router: Router) { }

  //--------------------------------------------------------

  ngOnInit() {
    this.getAPIDetails();
    this.selectedCat = {};

  //---Get user details 
    this.storage.get('user').then((obj) => {
      //---console.log(obj);
      this.user = obj
    });

  //---Get saved cats array  
    this.storage.get('savedCats').then((storedCats) => {
      this.savedCats = JSON.parse(storedCats);
      //---console.log(this.savedCats);
  });
  }
 
  //--------------------------------------------------------
  
  //---Get array of cat breeds from API
  getAPIDetails() {
    this.http.get(this.endpoint).subscribe(
      (response) => {
        //---console.log(this);
        this.breedslist = response;
        //---console.log(this.breedslist);
      }
    );

  }

  //--------------------------------------------------------

  //---Removed from list toast alert 
  async removedAlert() {
    const toast = await this.toastController.create({
          message: 'Removed from Cat-alogue',
          duration: 2000,
          cssClass: 'my-toast',
        });
        toast.present();
   }

  //--------------------------------------------------------

  //---Pass selected cat's details to cat-details page
  onSelect(catObject) {
    this.selectedCat = catObject;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        catObject: JSON.stringify(this.selectedCat)
      }
    };
    //---console.log(navigationExtras);
    this.router.navigate(['/cat-details'], navigationExtras);
  }

  //--------------------------------------------------------

  //---Delete cat from list
  delete(i) {
    //---console.log(index);
    this.savedCats.splice(i,1);
    this.storage.set("savedCats", this.savedCats);
  }

   
  }