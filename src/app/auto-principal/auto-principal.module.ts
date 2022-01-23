import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoPrincipalPageRoutingModule } from './auto-principal-routing.module';

import { AutoPrincipalPage } from './auto-principal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoPrincipalPageRoutingModule
  ],
  declarations: [AutoPrincipalPage]
})
export class AutoPrincipalPageModule {}
