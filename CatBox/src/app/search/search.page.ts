import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  endpoint = 'https://api.thecatapi.com/v1/breeds';
  nameInput: string = "";
  catImageURL: string = "";

  catObjectArray: any = [];
  catObject: any = {};

  isShown: boolean = false ; // hidden by default
  country_flag_url: string = ``;

  selectedCat?: any = {};

  //--------------------------------------------------------

  constructor(private http: HttpClient, private router: Router) {}

  //--------------------------------------------------------

  ngOnInit(){
    let selectedCat = {};
  }

  getCatDetails(){
    this.http.get(this.endpoint).subscribe((response) => {
      this.isShown = ! this.isShown;

      this.catObjectArray = response;
      console.log(this.catObjectArray);

      for (let aCatObject of this.catObjectArray){
        if (aCatObject.name === this.nameInput){
          this.catObject = aCatObject;
        }
      }
      this.catImageURL = this.catObject.image.url;
      this.country_flag_url = `https://www.countryflags.io/${this.catObject.country_code}/flat/64.png`
      this.nameInput = "";
      console.log(this.catObject);
    });

  }

  onSelect(catObject){
    this.selectedCat = catObject;

    let navigationExtras: NavigationExtras = {
      state: {
        catObject: this.selectedCat
      }
    };
    console.log(navigationExtras)
    this.router.navigate(['/cat-details'], navigationExtras)
  }

}
