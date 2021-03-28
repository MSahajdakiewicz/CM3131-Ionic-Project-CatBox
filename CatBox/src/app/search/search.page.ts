import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

  //--------------------------------------------------------

export class SearchPage {

  endpoint = 'https://api.thecatapi.com/v1/breeds';
  nameInput: string = "";
  breedslist: any = [];
  catObject: any = {};
  catImageURL: string = "";
  countryFlagUrl: string = ``;

  isShown: boolean = false;

  selectedCat?: any = {};

  catCollection: any[] = [];

  //--------------------------------------------------------

  constructor(private storage: Storage, private http: HttpClient, private router: Router) { }

  //--------------------------------------------------------

  ngOnInit() {
    this.selectedCat = {};
  }

  //--------------------------------------------------------
 
  //---Get searched cat breed info based on user input
  getCatDetails() {
    this.http.get(this.endpoint).subscribe((response) => {
      this.isShown = ! this.isShown;

      this.breedslist = response;
      console.log(this.breedslist);

      for (let aCatObject of this.breedslist){
        if (aCatObject.name === this.nameInput){
          this.catObject = aCatObject;
        }
      }
      this.catImageURL = this.catObject.image.url;
      this.countryFlagUrl = `https://www.countryflags.io/${this.catObject.country_code}/flat/64.png`
      this.nameInput = "";
      console.log(this.catObject);
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
    console.log(navigationExtras);
    this.router.navigate(['/cat-details'], navigationExtras);
  }

  //--------------------------------------------------------

  //---Attempt to save catObject in array to use on collection/favourites pages
  addToCollection(catObject) {
    this.catCollection.push(catObject);
    localStorage.setItem("storedCats", JSON.stringify(this.catCollection));
    console.log(this.catCollection);    
  }

}
