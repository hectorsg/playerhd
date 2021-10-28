import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipeModule } from './../pipes/pipe/pipe/pipe.module';

import { HomePageRoutingModule } from './home-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { CloudflareStreamModule } from "@cloudflare/stream-angular";
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipeModule,
    DragDropModule,
    InfiniteScrollModule,CloudflareStreamModule,
    IonicStorageModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ], // <- You need to add this line
  declarations: [HomePage]
})
export class HomePageModule {}
