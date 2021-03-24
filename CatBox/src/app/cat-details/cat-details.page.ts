import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.page.html',
  styleUrls: ['./cat-details.page.scss'],
})
export class CatDetailsPage implements OnInit {

  catObject = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>
      {
        this.catObject = this.router.getCurrentNavigation().extras.state.catObject;
        console.log('Details page',this.catObject)
      }
    );
  }

}
