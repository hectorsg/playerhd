import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdHipoAdminPageRoutingModule } from './prod-hipo-admin-routing.module';

import { ProdHipoAdminPage } from './prod-hipo-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdHipoAdminPageRoutingModule
  ],
  declarations: [ProdHipoAdminPage]
})
export class ProdHipoAdminPageModule {}
