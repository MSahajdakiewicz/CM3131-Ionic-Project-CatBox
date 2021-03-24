import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatDetailsPageRoutingModule } from './cat-details-routing.module';

import { CatDetailsPage } from './cat-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatDetailsPageRoutingModule
  ],
  declarations: [CatDetailsPage]
})
export class CatDetailsPageModule {}
