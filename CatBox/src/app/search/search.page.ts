import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

  //--------------------------------------------------------

export class SearchPage {

  user = {}

  endpoint = 'https://api.thecatapi.com/v1/breeds';
  nameInput: string = "";
  breedslist: any = [];
  catObject: any = {};
  catImageURL: string = "";
  countryFlagUrl: string = ``;

  isShown: boolean = false;
  error: boolean = false;
  errorMsg = "";

  selectedCat?: any = {};

  catCollection: any = [];

  buttonIcon: string = "paw-outline";
 
  //--------------------------------------------------------

  constructor(private storage: Storage, private http: HttpClient, private router: Router, public toastController: ToastController) { }

  //--------------------------------------------------------

  ngOnInit() {
    this.selectedCat = {};
    this.storage.get('user').then((obj) => {
      //---console.log(obj);
      this.user = obj
    });

  }

  //--------------------------------------------------------
 
  //---Get searched cat breed info based on user input
  getCatDetails() {
    this.http.get(this.endpoint).subscribe((response) => {
      
      this.breedslist = response;
      //---console.log(this.breedslist);

      for (let aCatObject of this.breedslist){
        if (aCatObject.name === this.nameInput){
          this.catObject = aCatObject;
          this.isShown = ! this.isShown;
        }
        else {
          this.error = ! this.error;
          this.errorMsg = "No kitty found!";
        }
      }
      this.catImageURL = this.catObject.image.url;
      this.countryFlagUrl = `https://www.countryflags.io/${this.catObject.country_code}/flat/64.png`
      this.nameInput = "";
      this.buttonIcon = "paw-outline";
      //---console.log(this.catObject);
    });

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

  //---Save catObject in array to use on collection/favourites page
  addToCollection(catObject) {
    this.catCollection.push(catObject);
    let savedCats = JSON.stringify(this.catCollection);
    this.storage.set('savedCats', savedCats);
    //---console.log(this.catCollection)
  }

  //--------------------------------------------------------

  //---Added to Cat-alogue toast alert
  async addedAlert(getIcon: string) {
    if (this.buttonIcon === 'paw-outline') {
      this.buttonIcon = "paw";
      const toast = await this.toastController.create({
        message: 'Added to Cat-alogue',
        duration: 2000,
        cssClass: 'my-toast',
      });
      toast.present();
    }

 }

}
