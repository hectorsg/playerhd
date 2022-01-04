import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoHipodromosPageRoutingModule } from './auto-hipodromos-routing.module';

import { AutoHipodromosPage } from './auto-hipodromos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoHipodromosPageRoutingModule
  ],
  declarations: [AutoHipodromosPage]
})
export class AutoHipodromosPageModule {}
