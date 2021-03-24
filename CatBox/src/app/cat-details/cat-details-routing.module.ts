import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatDetailsPage } from './cat-details.page';

const routes: Routes = [
  {
    path: '',
    component: CatDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatDetailsPageRoutingModule {}
