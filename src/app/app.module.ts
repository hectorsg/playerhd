import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//componentes
import { AccComponent } from './juegos/acc/acc.component';
import { HipodromoComponent } from './modales/hipodromo/hipodromo.component';
import { EpisodioComponent } from './modales/episodio/episodio.component';
import { GacetaComponent }from './modales/gaceta/gaceta.component'

//firebase
import { firebaseConfig } from '../environments/environment';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// pdf 
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//Pipes
import { SafePipe } from './pipes/safe.pipe';
import { PipeModule } from './pipes/pipe/pipe/pipe.module';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AddEpisodioComponent } from './admin/add-episodio/add-episodio.component';
import { LoginemailComponent } from './modales/loginemail/loginemail.component';
import { HipodromoadminComponent } from './admin/hipodromoadmin/hipodromoadmin.component';
import { EncuestasComponent } from './modales/encuestas/encuestas.component';
import { RedesComponent } from './modales/redes/redes.component';

//import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CloudflareStreamComponent, CloudflareStreamModule } from "@cloudflare/stream-angular";
//otros
import {DragDropModule} from '@angular/cdk/drag-drop'
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PronosticoComponent } from './modales/pronostico/pronostico.component';
import { PronosticoadminComponent } from './admin/pronosticoadmin/pronosticoadmin.component';
import { StoriesadminComponent } from './admin/storiesadmin/storiesadmin.component';
import { PronosticosuperComponent } from './admin/pronosticosuper/pronosticosuper.component';
import { FullscreenComponent } from './modales/fullscreen/fullscreen.component';
import { PushnotficacionsService } from './servicios/pushnotficacions.service';
import { FundacionComponent } from './modales/fundacion/fundacion.component';
import { AtreveanarrarComponent } from './modales/atreveanarrar/atreveanarrar.component';
import { EnvivoAdminComponent } from './envivo-admin/envivo-admin.component';
import { NewsAdminComponent } from './admin/news-admin/news-admin.component';
import { OptimizacionComponent } from './admin/optimizacion/optimizacion.component';
import { MisionvisionComponent } from './modales/misionvision/misionvision.component';
import { HowToComponent } from './modales/how-to/how-to.component';
import { StreamadminComponent } from './admin/streamadmin/streamadmin.component';
import { IntersitialComponent } from './modales/intersitial/intersitial.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,EpisodioComponent,SafePipe,HipodromoComponent,EncuestasComponent, AccComponent,
     AddEpisodioComponent,LoginemailComponent,HipodromoadminComponent, GacetaComponent,RedesComponent,
    PronosticoComponent,PronosticoadminComponent, StoriesadminComponent, PronosticosuperComponent, FullscreenComponent, FundacionComponent,
    AtreveanarrarComponent, EnvivoAdminComponent, NewsAdminComponent, OptimizacionComponent,MisionvisionComponent, HowToComponent, StreamadminComponent,IntersitialComponent],


  entryComponents: [EpisodioComponent,HipodromoComponent,AccComponent, AddEpisodioComponent, RedesComponent,EncuestasComponent,
    GacetaComponent, LoginemailComponent,HipodromoadminComponent, PronosticoComponent,PronosticoadminComponent, StoriesadminComponent,
    PronosticosuperComponent,FullscreenComponent, FundacionComponent, AtreveanarrarComponent, EnvivoAdminComponent, NewsAdminComponent,
    OptimizacionComponent, MisionvisionComponent, HowToComponent, StreamadminComponent, IntersitialComponent],


  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),IonicStorageModule.forRoot(),
    AngularFireAnalyticsModule,PipeModule,DragDropModule ,InfiniteScrollModule ,CloudflareStreamModule,HttpClientModule,
 
   AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },/* GooglePlus,AdMobFree,*/InAppBrowser, CloudflareStreamComponent, HttpClient ],
  schemas: [ NO_ERRORS_SCHEMA ], // <- You need to add this line
  bootstrap: [AppComponent],
})
export class AppModule {}
 