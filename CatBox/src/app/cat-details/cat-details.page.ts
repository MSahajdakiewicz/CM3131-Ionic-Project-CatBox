import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.page.html',
  styleUrls: ['./cat-details.page.scss'],
})

  //--------------------------------------------------------

export class CatDetailsPage implements OnInit {

  catObjectDetails: any;

  //--------------------------------------------------------

  constructor(private route: ActivatedRoute, private router: Router) { 

  //---Get selected cat details  
  this.route.queryParams.subscribe(params => {
      console.log('params: ', params);

      if (params && params.catObject) {
        this.catObjectDetails = JSON.parse(params.catObject);
      }
    });
  }

  //--------------------------------------------------------

  ngOnInit() { }
 
}
