import { AngularFirestore } from '@angular/fire/firestore';
import { AccComponent } from './../juegos/acc/acc.component';
import { TriviaService } from './../servicios/trivia.service';
import { HipodromoComponent } from './../modales/hipodromo/hipodromo.component';
import { EpisodioComponent } from './../modales/episodio/episodio.component';
import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { IonSlides, MenuController, ModalController, ActionSheetController, ToastController, IonInfiniteScroll, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../servicios/auth.service';
import { AccService } from '../servicios/acc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddEpisodioComponent } from '../admin/add-episodio/add-episodio.component';
import sortBy from 'sort-by';
import { GacetaComponent } from '../modales/gaceta/gaceta.component';
import { LoginemailComponent } from '../modales/loginemail/loginemail.component';
import { HipodromoadminComponent } from '../admin/hipodromoadmin/hipodromoadmin.component';
import { EncuestasComponent } from '../modales/encuestas/encuestas.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PronosticoComponent } from '../modales/pronostico/pronostico.component';
import { PronosticoadminComponent } from '../admin/pronosticoadmin/pronosticoadmin.component';
import { StoriesadminComponent } from '../admin/storiesadmin/storiesadmin.component';
import { PronosticosuperComponent } from '../admin/pronosticosuper/pronosticosuper.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { FullscreenComponent } from '../modales/fullscreen/fullscreen.component';
import { PushnotficacionsService } from '../servicios/pushnotficacions.service';
import { FundacionComponent } from '../modales/fundacion/fundacion.component';
import { AtreveanarrarComponent } from '../modales/atreveanarrar/atreveanarrar.component';
import { EnvivoAdminComponent } from '../envivo-admin/envivo-admin.component';
import { NewsAdminComponent } from '../admin/news-admin/news-admin.component';
import { OptimizacionComponent } from '../admin/optimizacion/optimizacion.component';
import { Storage } from '@ionic/storage-angular';
import { MisionvisionComponent } from '../modales/misionvision/misionvision.component';
import { HowToComponent } from '../modales/how-to/how-to.component';
import { StreamadminComponent } from '../admin/streamadmin/streamadmin.component';


declare var videojs : any ;

declare var Stream : any ;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('contenido', { static: false}) contenidoss: IonSlides;
  @ViewChild('programacion', { static: false}) progra: IonSlides;
  @ViewChild('quic', {static:false}) quick : IonSlides;
  @ViewChild('cintillo',{static:false}) cint : IonSlides;


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('playpaussss') playPuseAccction : ElementRef;




  @ViewChild('scrollMe') myScrollContainer: ElementRef;


  

  public audios : any;
  public audio: any;
  public login : boolean;
  public start:boolean;
  public videoMenuOpen:string;
  public EnVivoActive:string;
  public EpisodiosActive:string;
  public HipodromosActive:string;
  public JuegosActive:string;
  public EnCentro:string;
  public ToSearch:boolean;
  public ToSearchG:boolean;
  public onVivoBoton:string;
  public transpDiv:string;
  public despuesActive:string;
  public destacadoActive:string;
  public progamaActive:string;
  public loginEmail : boolean;
  public gacetaActive:string;
  public episodiosAll : any;
  public turfIcon : string;
  public dismissBotonDiauno:string;
  public dissmissBotonDiaDos :  string; 
  public dissmissBotonDiaTres :string;
  public botonScale : string;
  public hipodromosAll:any;
  public PaisName:any;
  public hipodromosTitle:string;
  public hipodromosTitleIng : string;
  public EpisodioLongDate:string;
  public FullMonth:string;
  public day:string;
  public episodioTitle:string;
  public textoBuscar='';
  public catName:any;
  public buscarEpisodio = '';
  public textoGaceta = '';
  public ToSearchE:boolean;
  public gacetaIcon:string;
  public userAny:any;
  public episodiosDestacado:any;
  public episodiosByDay:any;
  public MisEpisodiosMasTarde:any;
  public salaAllArray:any;
  public salasDisponibles :any;

  //necesario para video js
  player: any ;
  playerMin:any;
  playerHip2 : any;
  playerHip3 : any;
  playerHip4:any;
  playerHip5:any;
  playerHip6:any;
  playerHip7:any;
  playerHip8:any;
  playerHip9:any;
  playerHip10:any;
  playerHip11:any;
  playerHip12:any;
  playerHip13:any;
  playerHip14:any;
  playerHip15:any;


  public hip2 : any;

  //aqui van los booleanos
  public hipodro1 : boolean = false
  public hipodro2 : boolean = false
  public hipodro3 : boolean = false
  public hipodro4 : boolean = false
  public hipodro5 : boolean = false
  public hipodro6 : boolean = false
  public hipodro7 : boolean = false
  public hipodro8 : boolean = false
  public hipodro9 : boolean = false
  public hipodro10 : boolean = false
  public hipodro11 : boolean = false
  public hipodro12 : boolean = false
  public hipodro13 : boolean = false
  public hipodro14 : boolean = false
  public hipodro15 : boolean = false
  public howManyMaxMin:string;
  //variables del ionrange
  public valueRuedita :number;
  public step : number;
  public min : number;
  public max:number;

  public howMuchBack:string;

  public otherTime:number;
  public registro : boolean;
  public isPlayin : string;

  public dateRuedita:string;
  public myCurrentHour:string;
  public lastfive:string;
  public month:string;
  public lastten:string;
  public Laterfive:string;
  public LaterTen:string;
  public VivoConfig:string = 'https://youtu.be/vGXQbPt_k5Q'
  public VivoConfig2:string = 'https://www.youtube.com/watch?v=NL3gWsg0RPQ'
  public dataSetup:string;
  public gacetaTitle:string;
  public gacetaTitleIng : string;
  public gacetaHipodromos:any;
  public splashScreen:string = 'background: url(../../assets/other/SPLASH.png);  background-position: center;background-repeat: no-repeat;background-size: cover;transition-timing-function: linear;'
  public episodiosPropios : any;
  public ProgramaName : any;
  public episodioDestacadoOtros : any;
  public encuestas:any;
  public accActive:any;
  public accConfig : any;
  public encuestaActive : any;
  public pronosticos : any;
  public pronosticosHoy: any;
  public pronosticosOtros : any;
  public soporte : boolean;
  public Rnombre : string;
  public Rapellido : string;
  public Rcorreo : string;
  public Rpassword : string;
  public photoAlt: string;
  public newsArray : any;
  public newCont : string;
  public newData : any;
  public pronostiHoy : any;
  public pronostiViejos : any;
  public viewheight:string;
  public streamConfig :any;
  public streamCount :number;
  public inputdePrueba : string
  //Fix ipads
  public logoT : string;
  public showBotFix : string;
  public liveFix : string;
  public botonFix : string;
  public avatarFix : string;
  public redesDatas : any;
  public slice: number = 5; 
  public videoProgress : string;
  public pronoIndexIs : string;
  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  public destacadoIng : string;
  public programacionIng : string;
  public aHourComp : number;
  public indexOfDestacado : number = 4
  public indexOfPronostico : number = 3
  public indexOfEpisodio : number = 8
  public indexOfHipodromo : number = 8
  public indexOfGaceta : number = 8
  public url:string;
  public hipodromosAllRef : any;
  public myTalent : any;
  public whereIs : string;
  public toPause : string;
  public estaEnPlay : boolean;
  public encuestaConfig : any;
  public atreveteConfig : any;
  public fundacionConfigu : any;
  public qsConfig : any;
  public rsConfigu : any;
  public personalData : any;
  public talentsBios : any;
  private _storage: Storage | null = null;
  public dateRueditaIng : string;
  public episodioTitleIng : string;
  public misionvision : any;
  public elLun : string;
  public elMar : string;
  public elMie : string;
  public elJue : string;
  public elVie : string;
  public elSab : string;
  public elDom : string;
  public PronosticosIng : string;
  //Variables para el cambio de idioma
  public toChangeLang : boolean;
  public MyLangIs : string;
  public knowIfPlay : boolean;
  public isMudo : boolean;
  playerTwwwoo : any;
  public isMudotwo : boolean;
  public openHipodromoEnVivo : string;
  public hip : any;
  public myHipodromoVivo : any = [] 
  public slideStyle : string
  public howToVideos : any;
  public videoLinkId : string;
  public patrocinadoresList : any;
  public patrocinadorPushCount : number = 0
  public updateHipoCount : number = 0
  public updateEpisodiCount : number = 0

  public updateDestacadoCount : number = 0

  public isNotLogged : boolean;

  public isMyUser : string;

  public misAdsStats : any;

  public myUserNoLog : string;

  public misAdsStatsEpisodio : any;

  public misAdsStatsDestacado : any;

  public typeOfVideoLink : string;

  public misHipodromosActivos : any;

  public esHipodromo : boolean = false;

  public isCloudflareOr : boolean = false;

  public cloudLink : string;

  playerw : any;

  public reproductorStyle : string;

  public pulsoRuedita : boolean;

  public isClosedthePlay : boolean = true

  public moreLarge : string = 'height:50%;';


  episodios={
    initialSlide: 0,
    slidesPerView: 6,
    speed: 400,
    direction:'vertical'
  }
  sliderprog={
    initialSlide:0,
    speed:400
  }
  contenidos={
    initialSlide: 1,
    slidesPerView: 1,
    speed: 650
  }

  miniInfo={
    initialSlide:0,
    slidesPerView:1,
    speed:400,
    autoplay:{
      delay:4000
    }
  }

  public misEpisodiosGuardados : any;

  constructor(public modal : ModalController, public menu:MenuController, public app : TriviaService,
              public action : ActionSheetController, public afAuth : AngularFireAuth, public db :AngularFirestore, 
              public toast:ToastController, public auth : AuthService, public appSer : AccService,
              public sanitaizer : DomSanitizer,private inBro : InAppBrowser, public storage : AngularFireStorage, 
              public pussh : PushnotficacionsService, public platform : Platform, 
              private storageInterna: Storage) {

                
               
                
               this.getDeviceLanguage()
                
               
  }

 async getDeviceLanguage() {
    const storage = await this.storageInterna.create();
    this._storage = storage;

    this.videoLinkId = await this._storage?.get('tvLink')
    

    this.typeOfVideoLink = await this._storage?.get('tvTypeOfLink')
    
    

    this.myUserNoLog  = await this._storage?.get('noLoginUser');

    this.isCloudflareOr = await this._storage?.get('isCloudOr')

    this.cloudLink = await this._storage?.get('myCloudLink')


    
   this.openPrincipalVideo()


  /*  this.app.getEnVivoConfig().subscribe(item =>{
      let config:any  = item
 
       // this.VivoConfig = config[0].tvLink 

      console.log('lo estas sacando de DeviceLanguage')
            
     })*/
    if (window.Intl && typeof window.Intl === 'object') {
      
      const whatLanIs = await this._storage?.get('Lenguaje');

      console.log(whatLanIs)

   




      if(navigator.language.includes(whatLanIs) ){
        console.log('es el mismo Lenguaje')
        console.log(whatLanIs)
      }else{
      //this._storage?.set('Lenguaje', navigator.language);

        if(whatLanIs !== null){

          console.log('Default ', whatLanIs)
        }else{
          this._storage?.set('Lenguaje', navigator.language);
          console.log('Setting default lang')
          this.getDeviceLanguage()
        }
      }

      if(whatLanIs.includes('en')){
        console.log('your app is in english')
        this.MyLangIs = 'en'
      }

      if(whatLanIs.includes('es')){
        console.log('La app esta en espanol')
        this.MyLangIs = 'es'
      }
      console.log('mueres aqui')


      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){
        this.MyLangIs = 'es'
      }else{
      //  console.log('Estas en un idioma correcto')
      }

      



    }else{
      console.log('entra aqui porque no deja')
    }



    await this.sleep(500)

    this.askWhatDayIS()
   
  }


 async setUs(){
 
   await this._storage?.set('Lenguaje', 'en')
   this.getDeviceLanguage()
   
  }


  async setArrayPrueba(){
    await this._storage?.set('ArrayPrueba', this.episodioDestacadoOtros)
  }

  async verPruebaArray(){
    let holaHey : any = await this._storage?.get('ArrayPrueba')

    console.log(holaHey, 'holaa')


  }

  async setEs(){
    
    await this._storage?.set('Lenguaje', 'es')
    this.getDeviceLanguage()
    
   }

   async setPt(){
    await this._storage?.set('Lenguaje', 'pt')
    this.getDeviceLanguage()
   }

 async quitarLenguaje(){
   await this._storage?.set('Lenguaje', 'es-ES')
  }



  eliminarGuardado(item){
    this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.id).delete().then(()=>{
      this.seEliminoelEpidosio()
    })
  }





  doInfinite(e){



    setTimeout(() => {
      this.indexOfDestacado += 4;
      e.target.complete()
      

      // App logic to determine if all data is loaded

      if(this.episodioDestacadoOtros.length <= this.indexOfDestacado){
        e.target.disabled = true;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
    
  }


  doInfinitePronostico(){



    setTimeout(() => {
      

      // App logic to determine if all data is loaded

      if(this.pronostiViejos.length <= this.indexOfPronostico){
        
      }else{
        this.indexOfPronostico += 3;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
    
  }
  doInfiniteEpisodio(){
    
    setTimeout(() => {
      

      // App logic to determine if all data is loaded

      if(this.episodiosPropios.length <= this.indexOfEpisodio){
        
      }else{
        this.indexOfEpisodio += 3;  
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }


  doInfiniteHipodromo(){
    
    setTimeout(() => {
    

      // App logic to determine if all data is loaded

      if(this.hipodromosAllRef.length <= this.indexOfHipodromo){
   
      }else{
        this.indexOfHipodromo += 3;   
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }

  doInfiniteGaceta(){
    
    setTimeout(() => {  

      // App logic to determine if all data is loaded

      if(this.hipodromosAllRef.length <= this.indexOfGaceta){
        
      }else{
        
      this.indexOfGaceta += 3;
      }
      // and disable the infinite scroll
     
    }, 500);
   /* setTimeout(() => {
      this.slice += 5;
    }, 200);*/
  }

  pruebapruebaprueba(){

    setTimeout(() => {
     
      

      // App logic to determine if all data is loaded

      if(this.misHipodromosActivos.length <= this.indexOfDestacado){

        console.log('que pasa aqui')

        console.log(this.indexOfDestacado)
        console.log(this.misHipodromosActivos.length)
       
      }else{
        this.indexOfDestacado += 3;
      }
      // and disable the infinite scroll
     
    }, 750);
   
  
  }

  async knoMyLANG(){
    
    const whatLanIs = await this._storage?.get('Lenguaje');

    console.log(whatLanIs)
  }

 async setTvLink(link){
    await this._storage?.set('tvLink', link)
    this.getDeviceLanguage()
  }


  async setTvTypeOfLink(type){
    
    await this._storage?.set('tvTypeOfLink', type)
    this.getDeviceLanguage()
  }

  async setiSCloudFlare(clod){
    
    await this._storage?.set('isCloudOr', clod)
    this.getDeviceLanguage()
  }

  async setiSCloudFlareLink(linkCloud){
    await this._storage?.set('myCloudLink', linkCloud)
    this.getDeviceLanguage()
  }

  ionViewDidEnter(){
    
    this.newCont = 'bottom:-41%;'
    this.toPause = 'opacity:0;'
    let view = document.getElementById("cont")
     let viewh :number = view.offsetHeight
     this.viewheight = 'height:' +viewh+'px;'

     let widtthSli : number = view.offsetWidth
     this.slideStyle = 'width:'+ widtthSli + 'px;'

     console.log(widtthSli)

     if(viewh >= 1024){
       this.logoT = 'width:12%;'
       this.liveFix = 'width:10%;'
       this.showBotFix = 'font-size:18px;'
       this.botonFix = 'font-size:14px;'
       this.avatarFix = 'width:85%;'
     }

     

     
     
    this.soporte = false
    this.login = false
    this.registro = false
    this.loginEmail = false
    this.photoAlt = null

    this.howManyMaxMin = '10 seg'
    this.step = 1
    this.min = -10
    this.max = 10
    this.valueRuedita = 0

    this.quick.update()

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;

          this.app.getMisEpisodios(user.uid).subscribe(item =>{
            this.misEpisodiosGuardados = item
          })
         
          
        })
       }else{

        

       // this.isMyUser = myUserNoLog

        if(this.myUserNoLog !== null){
          this.isNotLogged = true
        }else{
          this.isNotLogged = true
          const id = Math.random().toString(36).substring(2);
          this._storage?.set('noLoginUser', id);
        }
         
       }
      }

      


  )


  this.app.getaccConfiguracion().subscribe(item => {

    let fraarr : any = item

   let accConf= fraarr.filter(item => item.type === 'acc')
   let encuestas = fraarr.filter(item => item.type === 'encuestas')
   let atreveteConfig = fraarr.filter(item => item.type === 'Atrevete a Narrar')
   let fundacionConfi = fraarr.filter(item => item.type === 'Fundacion')
   let quienesSom = fraarr.filter(item => item.type === 'QS')
   let misionvisionAny = fraarr.filter(item => item.type === 'misionvision')
   let redesSo = fraarr.filter(item => item.type === 'RS')

   let destacado = fraarr.filter(item => item.type === 'destacadoBotton')
   let programacion = fraarr.filter(item => item.type ===  'programacionBotton' )

   let pronosticos = fraarr.filter(item => item.type === 'pronosticosButton' )

   this.elDestacado(destacado)

   this.elProgramacion(programacion)

   this.elPronosticos(pronosticos)





   this.accConfig = accConf[Math.floor((Math.random()*accConf.length))]

   this.encuestaConfig = encuestas[Math.floor((Math.random()*encuestas.length))]

   this.atreveteConfig = atreveteConfig[Math.floor((Math.random()*atreveteConfig.length))]

   this.fundacionConfigu = fundacionConfi[Math.floor((Math.random()*fundacionConfi.length))]

   this.qsConfig = quienesSom[Math.floor((Math.random()*quienesSom.length))]
  
   this.misionvision = misionvisionAny[Math.floor((Math.random()*misionvisionAny.length))]
   
   this.rsConfigu = redesSo[Math.floor((Math.random()*redesSo.length))]

    
  })
  this.db.collection('entretenimientoConfig').doc('acc').valueChanges().subscribe(item =>{
    this.accActive = item
  })
  this.db.collection('entretenimientoConfig').doc('encuesta').valueChanges().subscribe(item =>{
    this.encuestaActive = item
  })
  this.appSer.salaALL().subscribe(item =>{
    this.salaAllArray = item
    this.salasDisponibles = this.salaAllArray.filter(item => item.isPublicRoom === true  && item.partidaDisponible === true);
  })

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();

    let myHour = d.getHours()

    this.aHourComp = myHour
    console.log(this.aHourComp)
    this.knowMyDates()

  



    switch(today) {
      case 0:
        this.day = "Dom";
        break;
      case 1:
        this.day = "Lun";
        break;
      case 2:
        this.day = "Mar";
        break;
      case 3:
        this.day = "Mie";
        break;
      case 4:
        this.day = "Jue";
        break;
      case 5:
        this.day = "Vie";
        break;
      case 6:
        this.day = "Sab";
    }
   

    this.askWhatDayIS()
    

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        break;
      case 1:
        this.FullMonth = "Febrero";
        break;
      case 2:
        this.FullMonth = "Marzo";
        break;
      case 3:
        this.FullMonth = "Abril";
        break;
      case 4:
        this.FullMonth = "Mayo";
        break;
      case 5:
        this.FullMonth = "Junio";
        break;
      case 6:
        this.FullMonth = "Julio";
        break;
      case 7:
          this.FullMonth = "Agosto";
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          break;
    }
    switch(n) {
      case 0:
        this.month = "January";
        
        break;
      case 1:
        this.month = "February";
        
        break;
      case 2:
        this.month = "March";
        
        break;
      case 3:
        this.month = "April";
        
        break;
      case 4:
        this.month = "May";
        
        break;
      case 5:
        this.month = "June";
        
        break;
      case 6:
        this.month = "July";
        
        break;
        case 7:
        this.month = "August";
        
        break;
        case 8:
        this.month = "September";
        
        break;
        case 9:
        this.month = "October";
        
        break;
        case 10:
        this.month = "November";
        
        break;
        case 11:
        this.month = "December";
        
        break;
    } 




     this.EpisodioLongDate = day.toString() + ' de ' + this.FullMonth + ' de ' + year.toString();

     this.dateRuedita = day.toString() + ' de ' + this.FullMonth

     this.dateRueditaIng = this.month + ' ' + day.toString()
    this.contenidoss.update();
    this.progra.update();
    this.progra.lockSwipes(true)
    this.contenidoss.lockSwipes(true)
    this.videoMenuOpen = 'config-buttons'
    this.EnVivoActive = 'active';
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.episodioTitle = 'Episodios Recientes'
    this.episodioTitleIng = 'Recent Episodes'
    this.hipodromosTitle = 'Todos los Hipodromos' 
    this.hipodromosTitleIng = 'All Racetracks'
    this.gacetaTitle = 'Todos los Hipodromos'
    this.gacetaTitleIng = 'All Racetracks'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    

    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      console.log(this.episodiosAll)
      //Aqui va el filtro de Episodios Destacado

     // console.log(this.episodioDestacadoOtros)



      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))

     console.log(this.episodiosPropios.length, ' Estos son los episodios que tenemos')

     // console.log(this.episodiosPropios)
      //Aqui va el filtro de programacion y dias
      let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
      this.episodiosByDay = secondFilter.filter(item => item.day === this.day) 
      this.episodiosByDay.sort(sortBy('horaEnd'));

      console.log(this.episodiosByDay)
      
   // this.episodiosAll = this.episodiosAll.filter(item=> item.semanaActiva === true)


      this.closeAuto()
    })

    this.app.getPulse('ruedita').subscribe(item =>{
     let res : any = item
this.pulsoRuedita= res[0].pulse

if(this.pulsoRuedita === true){
  this.moreLarge = null
}else{
  this.moreLarge = 'height:50%;'
}
      
    })

   

    this.app.getNews().subscribe(item =>{
      this.newsArray = item
      this.newsArray = this.newsArray.filter(item => item.date === this.EpisodioLongDate)
      this.newsArray.sort(sortBy('-hora'))

    })

    this.app.getHowToApp().subscribe(item => {
      this.howToVideos = item
    })

    this.app.getPronostico().subscribe(item=>{
      let ShortDate = day.toString() + ' de ' + this.FullMonth 
      let pronosticosArray:any = item
      pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
      this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
      this.pronostiHoy = this.pronostiHoy.filter(item => item.type === 'Pronostico' )
      this.pronostiHoy.sort(sortBy('-hour'))

      
      this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)

      this.pronostiViejos = this.pronostiViejos.filter(item => item.type === 'Pronostico')

      this.pronoIndexIs = 'Pronostico'
      //this.pronostiViejos.sort(sortBy('-fecha'))

    


    
    })

    this.app.getTalentos().subscribe(item => { 
    this.myTalent = item
    })



    


  
   this.gettingHipodromos()

    this.app.getRedesData().subscribe(item => {
      this.redesDatas = item
    })

    this.app.getPaisName().subscribe(item =>{
      this.PaisName = item
      this.PaisName.sort(sortBy('name'))
      
    })

    this.app.getProgramaName().subscribe(item =>{
      this.ProgramaName = item
      
    })

    this.app.getEncuesta().subscribe(item =>{
      this.encuestas = item
    })

    this.app.getCatEpisodioName().subscribe(item =>{
      this.catName = item
    })
    
    
  




    


  

   

  }

 async openPrincipalVideo(){


/*
  this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').valueChanges().subscribe(async item => { 
    let res : any = item

    //Aqui pregunta si cloudflare esta activo por primera vez
    if(this.isCloudflareOr === null){

      this.setiSCloudFlare(res.cloudflare)
      this.setiSCloudFlareLink(res.cloudflareLive)

    }else{

    if(this.isCloudflareOr === true){
        console.log('estas usando cloudflare')

        this.reproductorStyle = 'height: max-content;min-height:20%;'
    
        await this.sleep(500)


      
    
    
        const script = document.createElement("script")
          script.src =
            "https://embed.videodelivery.net/embed/sdk.latest.js"
          script.addEventListener("load", () => {
            this.player = Stream(
              document.querySelector("iframe"),
            )
          //  player.volume = 0.5
           // player.play()
    
         //   console.log('hola')

         this.goToLive()
    
            this.player.addEventListener('play', () => {
              console.log('playing!')
            })
    
            this.player.addEventListener('suspend', async()=>{
            

              this.isClosedthePlay = false
              await this.sleep(500)
              this.isClosedthePlay = true
            })
          })
          document.head.appendChild(script)

      }else{

        console.log(this.isCloudflareOr, ' aqui esta agarrando si cloudflare es true o no')

        this.reproductorStyle = 'height: 26%;min-height:20%;'

        await this.sleep(500)
        console.log('no estas usando cloudflare')

        this.playerw = videojs(document.getElementById('video-player'))
        this.playerw.poster('../../../assets/other/poster1.jpg')
    
        if(this.videoLinkId !== null && this.typeOfVideoLink !== null ){
    
          
    
          console.log(this.typeOfVideoLink, ' aqui hace la peticion en el viewdidenter')
    
          let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.videoLinkId)
                   
            const web:string = link.changingThisBreaksApplicationSecurity
        
            console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
           this.playerw.src({
            type: this.typeOfVideoLink,
             src: web,
           })
           this.playerw.play()
        
        
           this.isMudo = this.playerw.muted()
    
    
           console.log('tienes el link registrado y el tipo')
    
    
           this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').valueChanges().subscribe(item => {
            let resss : any = item
      
    
            if(resss.tvLink === this.videoLinkId && resss.type === this.typeOfVideoLink){
                console.log('es el mismo link que esta corriendo ahora y el mismo tipo')
               
            }else{
              //Funcion para escribir en la base de datos interna
    
              console.log('hay que cambiar el link')
              this.setTvLink(resss.tvLink)
              this.setTvTypeOfLink(resss.type)
              let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(resss.tvLink)
                   
            const web:string = link.changingThisBreaksApplicationSecurity
        
            console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
           this.playerw.src({
             type: resss.type,
             src: web,
           })
           this.playerw.play()
        
        
           this.isMudo = this.playerw.muted()
    
            }
      
            
          })
    
           
    
    
        }else{
    
          console.log('No tienes el link registrado o el tipo registrado')
          this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').valueChanges().subscribe(item => {
            let resss : any = item
      
            console.log(resss.tvLink)
            console.log(resss.type)
    
            this.setTvLink(resss.tvLink)
            this.setTvTypeOfLink(resss.type)
    
            
      
            let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(resss.tvLink)
                   
            const web:string = link.changingThisBreaksApplicationSecurity
        
            console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
           this.playerw.src({
            type: resss.type,
             src: web,
           })
           this.playerw.play()
        
        
           this.isMudo = this.playerw.muted()
        
        
           this.playerw.on('play', () => {
             this.knowIfPlay = true
            });
          })
        }
    
        this.playerw.on('play', () => {
          this.knowIfPlay = true
         });

         this.playerw.on('userinactive',()=>{
           console.log('inactivo')
         })
    
      }

      // Aqui pregunta si cambiaste el reproductor
      if(this.isCloudflareOr === res.cloudflare && this.cloudLink === res.cloudflareLive ){
        console.log('estas al dia')
      }else{
        this.setiSCloudFlare(res.cloudflare)
        this.setiSCloudFlareLink(res.cloudflareLive)
      }
    }


  })
*/

   

    // Aqui comienza el videoJs


    this.playerw = videojs(document.getElementById('video-player'))
    this.playerw.poster('../../../assets/other/poster1.jpg')

    if(this.videoLinkId !== null && this.typeOfVideoLink !== null ){

      

      console.log(this.typeOfVideoLink, ' aqui hace la peticion en el viewdidenter')

      let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.videoLinkId)
               
        const web:string = link.changingThisBreaksApplicationSecurity
    
        console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
       this.playerw.src({
        type: this.typeOfVideoLink,
         src: web,
       })
       this.playerw.play()
    
    
       this.isMudo = this.playerw.muted()


       console.log('tienes el link registrado y el tipo')


       this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').valueChanges().subscribe(item => {
        let res : any = item
  

        if(res.tvLinkA === this.videoLinkId && res.typeA === this.typeOfVideoLink){
            console.log('es el mismo link que esta corriendo ahora y el mismo tipo')
           
        }else{
          //Funcion para escribir en la base de datos interna

          console.log('hay que cambiar el link')
          this.setTvLink(res.tvLinkA)
          this.setTvTypeOfLink(res.typeA)
          let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(res.tvLinkA)
               
        const web:string = link.changingThisBreaksApplicationSecurity
    
        console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
       this.playerw.src({
         type: res.typeA,
         src: web,
       })
       this.playerw.play()
    
    
       this.isMudo = this.playerw.muted()

        }
  
        
      })

       


    }else{

      console.log('No tienes el link registrado o el tipo registrado')
      this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').valueChanges().subscribe(item => {
        let res : any = item
  
        console.log(res.tvLinkA)
        console.log(res.typeA)

        this.setTvLink(res.tvLinkA)
        this.setTvTypeOfLink(res.typeA)

        
  
        let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(res.tvLinkA)
               
        const web:string = link.changingThisBreaksApplicationSecurity
    
        console.log(link.changingThisBreaksApplicationSecurity + ' en el ionViewDidEnter')
       this.playerw.src({
        type: res.typeA,
         src: web,
       })
       this.playerw.play()
    
    
       this.isMudo = this.playerw.muted()
    
    
       this.playerw.on('play', () => {
         this.knowIfPlay = true
        });
      })
    }

    this.playerw.on('play', () => {
      this.knowIfPlay = true
     });


  }

  ScrollCtrl($scope, $location, $anchorScroll) {
    
    $scope.gotoBottom = function (){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('Club Hipico de Santiago');
  
      // call $anchorScroll()
      $anchorScroll();
    };
    
  }

  prueba(){
    console.log(this.myScrollContainer)
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
 async uitarMudo(){
   this.player.muted(false)
  this.isMudo = false

  }

  ponerMudo(){
    this.player.muted(true)
    this.isMudo = true
   }

  async elDestacado(item){
    await this._storage?.set('destacado', item[0].name)



    const destacadoTra = await this._storage?.get('destacado');

    this.destacadoIng = destacadoTra


  }

  changePronos(e){
    this.pronoIndexIs = e.detail.value
    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    this.pronostiHoy = null
    this.pronostiViejos = null
    this.app.getPronostico().subscribe(item=>{
      let ShortDate = day.toString() + ' de ' + this.FullMonth 
      let pronosticosArray:any = item
      pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
      this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
      this.pronostiHoy = this.pronostiHoy.filter(item => item.type === e.detail.value )
      this.pronostiHoy.sort(sortBy('-hour'))

      console.log(this.pronostiHoy)

      
      this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)

      this.pronostiViejos = this.pronostiViejos.filter(item => item.type === e.detail.value)


      console.log(this.pronostiViejos)


      //this.pronostiViejos.sort(sortBy('-fecha'))


    
    })
  }

  gettingHipodromos(){
    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item

      this.hipodromosAll.sort(sortBy('pais'))

      this.hipodromosAllRef = item

      this.gacetaHipodromos = this.hipodromosAll

      this.myHipodromoVivo = this.hipodromosAll.filter(item => item.enVivo === true)

      this.misHipodromosActivos = this.hipodromosAll.filter(item => item.actividad === true)

      console.log(this.misHipodromosActivos)

      


    })

    this.app.getPatrocinadores().subscribe(itemAd =>{
      this.patrocinadoresList = itemAd
      this.patrocinadoresList = this.patrocinadoresList.filter(item => item.ad === true)
      console.log(this.patrocinadoresList)
      let patroArray : any = this.patrocinadoresList.filter(item => item.hipodromo === true)
      let patroUnicoHip : any = patroArray[Math.floor((Math.random()*patroArray.length))] 

      let epiPatroArray : any = this.patrocinadoresList.filter(item => item.episodios ===true)
      let epiPatroUnico : any = epiPatroArray[Math.floor((Math.random()*epiPatroArray.length))] 

      let destPatroArray : any = this.patrocinadoresList.filter(item => item.destacado === true)
      let destPatroUnico : any = destPatroArray[Math.floor((Math.random()*destPatroArray.length))] 

      if(this.patrocinadorPushCount === 0){

        if(patroArray.length > 0){
          this.hipodromosAll.push(patroUnicoHip)
          this.misHipodromosActivos.push(patroUnicoHip)
          this.misHipodromosActivos.sort(sortBy('pais'))
          this.hipodromosAll.sort(sortBy('pais'))

          this.verPatrociHipodro(patroUnicoHip)
          
        }
        


        if(this.episodiosPropios){

          if(epiPatroArray.length > 0){
            this.episodiosPropios.push(epiPatroUnico)
            this.episodiosPropios.sort(sortBy('-fecha'))

            this.verPatrociEpisodios(epiPatroUnico)
            
          }
          
          if(destPatroArray.length > 0){
            this.episodioDestacadoOtros.push(destPatroUnico)
            this.episodioDestacadoOtros.sort(sortBy('-fecha'))
            this.verPatroDestacado(destPatroUnico)

          }

         

        
        }

        this.patrocinadorPushCount += 1
      }

     
      
    })
  }


 async verPatrociHipodro(patroUnicoHip){
    if(this.userAny){
      this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item =>{
        let statsUserRes : any = item


        this.misAdsStats = statsUserRes
        if(statsUserRes){

          if(this.updateHipoCount === 0){
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
              hipodromoView: statsUserRes.hipodromoView +1,
            })
            this.updateHipoCount += 1
          }

          

          
        }else{

          this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).set({
            hipodromoView:1,
            episodioView:1,
            destacadoView:1,
            pronosticoView:0,
            gacetaView:0,
            hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
            email:this.userAny.email,
            displayName:this.userAny.displayName
          })
        }
       /* this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
          //Aqui tiene que ir la accion de escribir vistas
        })*/
      })
     
    }else{

      if(this.isNotLogged === true){
        const myUserNoLog = await this._storage?.get('noLoginUser');

        this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).valueChanges().subscribe(ite =>{
          let otherStats : any = ite
          this.misAdsStats = otherStats

          if(otherStats){

            if(this.updateHipoCount === 0){
              this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).update({
                hipodromoView:otherStats.hipodromoView + 1,
              })
              this.updateHipoCount += 1
            }

          }else{
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).set({
              hipodromoView:1,
              episodioView:1,
              destacadoView:1,
              pronosticoView:0,
              gacetaView:0,
              hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
              email:'Usuario sin Registro'
          })
          }
        })


       
      }else{
        console.log('no hay usuario')
        await this.sleep(1500)
  
        this.verPatrociHipodro(patroUnicoHip)
      }
     
    }
  }

  async verPatrociEpisodios(patroUnicoHip){
    if(this.userAny){
      this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item =>{
        let statsUserRes : any = item


        this.misAdsStatsEpisodio = statsUserRes
        if(statsUserRes){

          if(this.updateEpisodiCount === 0){
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
              
              episodioView: statsUserRes.episodioView +1,
            })
            this.updateEpisodiCount += 1
          }

          

          
        }else{

          this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).set({
            hipodromoView:1,
            episodioView:1,
            destacadoView:1,
            pronosticoView:0,
            gacetaView:0,
            hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
            email:this.userAny.email,
            displayName:this.userAny.displayName
          })
        }
       /* this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
          //Aqui tiene que ir la accion de escribir vistas
        })*/
      })
     
    }else{

      if(this.isNotLogged === true){
        const myUserNoLog = await this._storage?.get('noLoginUser');

        this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).valueChanges().subscribe(ite =>{
          let otherStats : any = ite
          this.misAdsStatsEpisodio = otherStats

          if(otherStats){

            if(this.updateEpisodiCount === 0){
              this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).update({
                
                episodioView: otherStats.episodioView +1,
              })
              this.updateEpisodiCount += 1
            }

          }else{
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).set({
              hipodromoView:1,
              episodioView:1,
              destacadoView:1,
              pronosticoView:0,
              gacetaView:0,
              hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
              email:'Usuario sin Registro'
          })
          }
        })


       
      }else{
        console.log('no hay usuario')
        await this.sleep(1500)
  
        this.verPatrociEpisodios(patroUnicoHip)
      }
     
    }
  }

  async verPatroDestacado(patroUnicoHip){
    if(this.userAny){
      this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item =>{
        let statsUserRes : any = item

        this.misAdsStatsDestacado = statsUserRes
        if(statsUserRes){

          if(this.updateDestacadoCount === 0){
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
              
              destacadoView: statsUserRes.destacadoView +1,
            })
            this.updateDestacadoCount += 1
          }

          

          
        }else{

          this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).set({
            hipodromoView:1,
            episodioView:1,
            destacadoView:1,
            pronosticoView:0,
            gacetaView:0,
            hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
            email:this.userAny.email,
            displayName:this.userAny.displayName
          })
        }
       /* this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(this.userAny.uid).update({
          //Aqui tiene que ir la accion de escribir vistas
        })*/
      })
     
    }else{

      if(this.isNotLogged === true){
        const myUserNoLog = await this._storage?.get('noLoginUser');

        this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).valueChanges().subscribe(ite =>{
          let otherStats : any = ite
          this.misAdsStatsDestacado = otherStats

          if(otherStats){

            if(this.updateDestacadoCount === 0){
              this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).update({
                
                destacadoView: otherStats.destacadoView +1,
              })
              this.updateDestacadoCount += 1
            }

          }else{
            this.db.collection('patrocinadores').doc(patroUnicoHip.id).collection('stats').doc(myUserNoLog).set({
              hipodromoView:1,
              episodioView:1,
              destacadoView:1,
              pronosticoView:0,
              gacetaView:0,
              hipodromoClick:0,
            episodioClick:0,
            pronosticoClick:0,
            destacadoClick:0,
              email:'Usuario sin Registro'
          })
          }
        })


       
      }else{
        console.log('no hay usuario')
        await this.sleep(1500)
  
        this.verPatroDestacado(patroUnicoHip)
      }
     
    }
  }



  

 async dismissingHipdromoEnVivo(){
    this.openHipodromoEnVivo = 'bottom:-101%'
    await this.sleep(550)
    this.hipodro1 = false
    this.hipodro2 = false
    this.hipodro3 = false
    this.hipodro4 = false
    this.hipodro5 = false
    this.hipodro6 = false
    this.hipodro7 = false
    this.hipodro8 = false
    this.hipodro9 = false
    this.hipodro10 = false
    this.hipodro11 = false
    this.hipodro12 = false
    this.hipodro13 = false
    this.hipodro14 = false
    this.hipodro15 = false



    this.gettingHipodromos()
  }

  async elProgramacion(item){
    await this._storage?.set('programacion', item[0].name)



    const programacionTrad = await this._storage?.get('programacion');

    this.programacionIng = programacionTrad

  }

  async elPronosticos(item){
    await this._storage?.set('pronosticos', item[0].name)



    const pronosticosTra = await this._storage?.get('pronosticos');

    this.PronosticosIng = pronosticosTra

  }

  askWhatDayIS(){
    
 //preguntando si es lunes
 if(this.MyLangIs === 'es'){ 
  this.elLun = 'Lun'
    }
  if(this.MyLangIs === 'en'){ 
    this.elLun = 'Mon'
    }
  if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
      this.elLun = 'Lun'
    }
  //preguntando si es martes
  if(this.MyLangIs === 'es'){ 
    this.elMar = 'Mar'
      }
    if(this.MyLangIs === 'en'){ 
      this.elMar = 'Tue'
      }
    if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
        this.elMar = 'Mar'
      }
    //preguntando si es miercoles
    if(this.MyLangIs === 'es'){ 
      this.elMie = 'Mie'
        }
      if(this.MyLangIs === 'en'){ 
        this.elMie = 'Wed'
        }
      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
          this.elMie = 'Mie'
        }
    //preguntando si es jueves
    if(this.MyLangIs === 'es'){ 
      this.elJue = 'Jue'
        }
      if(this.MyLangIs === 'en'){ 
        this.elJue = 'Thu'
        }
      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
          this.elJue = 'Jue'
        }
    //preguntando si es viernes
    if(this.MyLangIs === 'es'){ 
      this.elVie = 'Vie'
        }
      if(this.MyLangIs === 'en'){ 
        this.elVie = 'Fri'
        }
      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
          this.elVie = 'Vie'
        }

    //preguntando si es sabado
    if(this.MyLangIs === 'es'){ 
      this.elSab = 'Sab'
        }
      if(this.MyLangIs === 'en'){ 
        this.elSab = 'Sat'
        }
      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
          this.elSab = 'Sab'
        }
    //preguntando si es domingo
    if(this.MyLangIs === 'es'){ 
      this.elDom = 'Dom'
        }
      if(this.MyLangIs === 'en'){ 
        this.elDom = 'Sun'
        }
      if(this.MyLangIs !== 'en' && this.MyLangIs !== 'es'){ 
          this.elDom = 'Dom'
        }

  }

  async darlePlayalVideo(){




    
  }

 async triggerClick() {
   await this.sleep(1000)
    let el: HTMLElement = this.playPuseAccction.nativeElement as HTMLElement;
    el.click()
    console.log('clicando')
    await this.sleep(500)
    el.click()
    console.log('clicando')
}
async seEliminoelEpidosio(){
    const toastPush = await this.toast.create({
      message:'Eliminaste este episodio correctamente de tu lista de ver mas tarde',
      duration:4000,
      color:'danger'
    });
    toastPush.present();
  
}
  async listenNotiPush(msg){
    const toastPush = await this.toast.create({
      message:msg.body,
      duration:3000
    });
    toastPush.present();
  }

  pauseStre(){
    this.estaEnPlay = false
    this.player.pause()
  }

  playStrea(){
    this.estaEnPlay = true
    this.player.play()
  }

  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }

  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `perfilPhotos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();


 
    
   }

   checkActive(){
    this.db.collection('activos').doc(this.userAny.uid).valueChanges().subscribe(item => {
      let res : any = item

      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


      let fechaOnString : string = day.toString() + ' de ' + this.FullMonth
      if(res){

        if(res.isActive === false){
          this.db.collection('activos').doc(this.userAny.uid).update({
            isActive : true,
            fecha: fechaOnString ,
            hora: hor+':'+minutes
          })
        }

      }else{
      
       this.db.collection('activos').doc(this.userAny.uid).set({
         uid : this.userAny.uid,
         nombre : this.userAny.displayName,
         foto: this.userAny.photoURL,
         isActive : true,
         estaEn: 'En Vivo',
         fecha: fechaOnString ,
         hora: hor+':'+minutes
       })
      }
    })
   }


   ngOnDestroy(){
    if(this.userAny){
      this.db.collection('activos').doc(this.userAny.uid).update({
        isActive: false
      })
    }
  }

   ActualizarFoto(){
    this.db.collection('users').doc(this.userAny.uid).update({
      photoURL: this.url
    }).then(()=>{
      this.url = null
      this.uploadPercent = null
    })
   }

  openNews(item){
    this.newCont = "bottom:0;"
    this.newData= item
    this.player.pause()
  }
  async  dismissNews(){
    this.newCont = "bottom:-41%;"
    await this.sleep(2000)
    this.newData = null
  }

  async verplayerMini(){

    await this.sleep(1000)

    this.cint.update()
    
    this.playerMin = videojs(document.getElementById('miniplay'))
    this.playerMin.poster('../../../assets/other/poster1.jpg')


       let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.streamConfig[0].videoUrl)

       const web:string = link.changingThisBreaksApplicationSecurity
      this.playerMin.src({
        type: 'application/x-mpegURL',
        src: web,
      });

      
    this.playerMin.play()
  }
  volverLogin(){
    this.login = false  
    this.loginEmail = false
    this.registro = false
  }

  dismissVideoMini(){
    this.db.collection('users').doc(this.userAny.uid).collection('config').doc('floatVideo').delete().then(()=>{
      this.playerMin.dispose()
      this.streamCount = 0
    })
  }

  goLiveMini(){
    this.playerMin.currentTime(this.playerMin.currentTime()+1000)
    this.playerMin.play()
  }

  async askDismissVidMini(){
    const actionSheet = await this.action.create({
      header: 'Espera un momento',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Eliminar Transmision Secundaria',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.dismissVideoMini()
          }
        },{
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }


  createProfilePhoto(){
    if(this.photoAlt === null){
      let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl('https://ui-avatars.com/api/?size=128&background=random&name='+this.Rnombre+'+'+this.Rapellido)

      this.photoAlt = link.changingThisBreaksApplicationSecurity
    }
  }

  RegisterNewUserEmail(){
    let displayName : string = this.Rnombre+' '+this.Rapellido
    this.auth.registerUsuario(displayName, this.photoAlt, this.Rcorreo, this.Rpassword).then(()=>{
      
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.userAny = item;
            this.volverLogin()
            if(this.userAny){
              this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                this.MisEpisodiosMasTarde = item
                
              })
            }
            
          })
         }
        })
    })
  }

  soporteAction(){
    this.menu.close('config')
    this.soporte = false
  }

 
 async dismissSplash(){
    this.splashScreen = 'background: url(../../assets/other/SPLASH.png);  background-position: center;background-repeat: no-repeat;background-size: cover;transition-timing-function: linear;top:100%;'

  await this.sleep(1300)
 //   this.darlePlayalVideo()

   
  }

async  pronosticoAdmin(){
        
    this.estaEnPlay = false
   
      this.playerw.pause()
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  


    const modal = await this.modal.create({
      component: PronosticoadminComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
  
    this.goToLive()
   
  });

  
  return await modal.present();

  }


  openEnVivoFullScreen(){
    this.estaEnPlay = false
    this.player.pause()
    if(this.streamCount> 0){
      this.playerMin.pause()
    }


    this.modal.create({
      component: FullscreenComponent ,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())

  }


 async openEnVivoAdmin(){


    this.estaEnPlay = false
  
      this.playerw.pause()
  
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  


    const modal = await this.modal.create({
      component: EnvivoAdminComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
  
    this.goToLive()
  
  });

  
  return await modal.present();






    

  }

async openNewsAdmin(){






    this.estaEnPlay = false
  
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  


    const modal = await this.modal.create({
      component: NewsAdminComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
   
    this.goToLive()
   
  });

  
  return await modal.present();



    

  }

  async openOptimizacionAdmin(){
    this.estaEnPlay = false
    
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  
    const modal = await this.modal.create({
      component: OptimizacionComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
   
    this.goToLive()
   
  });

  
  return await modal.present();

  }

 async myStories(){

    this.estaEnPlay = false
 
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  
    const modal = await this.modal.create({
      component: StoriesadminComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
 
    this.goToLive()
   
  });

  
  return await modal.present();



    
  }

  knowMyDates(){

    var timer = setInterval(()=>{

      let how = this.howManyMaxMin


      if(how === '10 seg'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        if(currentSeconds<10){
          
        this.myCurrentHour = currentHour+ ':0'+currentMinutes+':0'+currentSeconds
        }else{
          this.myCurrentHour = currentHour+ ':0'+currentMinutes+':'+currentSeconds

        }
      }else{
        if(currentSeconds <10){
          this.myCurrentHour = currentHour+ ':'+currentMinutes+':0'+currentSeconds
        }else{
          
        this.myCurrentHour = currentHour+ ':'+currentMinutes+':'+currentSeconds
      }}

      //past 5 Hour
      
      let h = new Date();
      h.setSeconds(h.getSeconds()-5);
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    

      if(pastFiveMinutes < 10){
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }else{
        if(pastFiveSeconds < 10){
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':0'+pastFiveSeconds
        }else{
          
        this.lastfive = pastFiveHours + ':'+pastFiveMinutes+':'+pastFiveSeconds
        }
      }

      //past 10 hour

      let t = new Date();
      t.setSeconds(t.getSeconds()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        if(pastTenSeconds < 10){
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':0'+pastTenSeconds
        }else{
          
        this.lastten = pastTenHours + ':0'+pastTenMinutes+':'+pastTenSeconds
        }
        }else{
          if(pastTenSeconds < 10){
            this.lastten = pastTenHours + ':'+pastTenMinutes+':0'+pastTenSeconds
          }else{
            this.lastten = pastTenHours + ':'+pastTenMinutes+':'+pastTenSeconds
          }
          

        }

      // later 5 hour
      let L = new Date();
      L.setSeconds(L.getSeconds()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 10){
        if(LateFiveSeconds<10){
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':0'+LateFiveSeconds
        }else{
          
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes+':'+LateFiveSeconds
        }
        
        }else{
          if(LateFiveSeconds<10){
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':0'+LateFiveSeconds
          }else{
            
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes+':'+LateFiveSeconds
          }
          
        }

       // later 10 hour
       let T = new Date()
       T.setSeconds(T.getSeconds()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
         if(LateTenSeconds<10){

          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':0'+LateTenMinutes+':'+LateTenSeconds
         }
        
       }else{
         if(LateTenSeconds<10){
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':0'+LateTenSeconds
         }else{
           
          this.LaterTen = LateTenHours + ':'+LateTenMinutes+':'+LateTenSeconds
         }
         
       }

      }
      if(how === '10 min'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();
      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }

      //past 5 Hour
      
      let h = new Date();
      h.setMinutes(h.getMinutes()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour

      let t = new Date();
      t.setMinutes(t.getMinutes()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
        this.lastten = pastTenHours + ':0'+pastTenMinutes
        }else{
          
        this.lastten = pastTenHours + ':'+pastTenMinutes
        }

      // later 5 hour
      let L = new Date();
      L.setMinutes(L.getMinutes()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();
      if(LateFiveMinutes < 0){
        
        this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
        }else{
          
        this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
        }

       // later 10 hour
       let T = new Date()
       T.setMinutes(T.getMinutes()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
       if(LateTenMinutes < 10){
        
        this.LaterTen = LateTenHours + ':0'+LateTenMinutes
       }else{
         this.LaterTen = LateTenHours + ':'+LateTenMinutes
       }

      }
      if(how === '10 hr'){
        this.myCurrentHour = null
        this.lastfive = null
        this.lastten = null
        this.Laterfive = null
        this.LaterTen = null
      //Current Hour
      let d = new Date();
      let currentHour = d.getHours();
      let currentMinutes = d.getMinutes();
      let currentSeconds = d.getSeconds();

      if(currentMinutes < 10){
        this.myCurrentHour = currentHour+ ':0'+currentMinutes
      }else{
        this.myCurrentHour = currentHour+ ':'+currentMinutes
      }
  
    

      //past 5 Hour
      let h = new Date();
      h.setHours(h.getHours()-5)
      let pastFiveHours = h.getHours();
      let pastFiveMinutes = h.getMinutes();
      let pastFiveSeconds = h.getSeconds();

    
      if(pastFiveMinutes < 10){

        this.lastfive = pastFiveHours + ':0'+pastFiveMinutes
      }else{

        this.lastfive = pastFiveHours + ':'+pastFiveMinutes
      }


      //past 10 hour
      let t = new Date();
      t.setHours(t.getHours()-10)
      let pastTenHours = t.getHours();
      let pastTenMinutes = t.getMinutes();
      let pastTenSeconds = t.getSeconds();
      if(pastTenMinutes < 10){
        
      this.lastten = pastTenHours + ':0'+pastTenMinutes
      }else{
        
      this.lastten = pastTenHours + ':'+pastTenMinutes
      }

      // later 5 hour
      let L = new Date();
      L.setHours(L.getHours()+5)
      let LateFiveHours = L.getHours();
      let LateFiveMinutes = L.getMinutes();
      let LateFiveSeconds = L.getSeconds();

      if(LateFiveMinutes < 0){
        
      this.Laterfive = LateFiveHours + ':0'+LateFiveMinutes
      }else{
        
      this.Laterfive = LateFiveHours + ':'+LateFiveMinutes
      }


       // later 10 hour
       let T = new Date()
       T.setHours(T.getHours()+10)
       let LateTenHours = T.getHours();
       let LateTenMinutes = T.getMinutes();
       let LateTenSeconds = T.getSeconds();
      if(LateTenMinutes < 10){
        
       this.LaterTen = LateTenHours + ':0'+LateTenMinutes
      }else{
        this.LaterTen = LateTenHours + ':'+LateTenMinutes
      }

      }

    
    },1000)
  
  }


async  openAddEpisodio(){
    this.estaEnPlay = false
 
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  
    const modal = await this.modal.create({
      component: AddEpisodioComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
  
    this.goToLive()
   
  });

  
  return await modal.present();


    




  }

 async openAdminPronostico(){
    this.estaEnPlay = false
  
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  
    const modal = await this.modal.create({
      component: PronosticosuperComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
 
    this.goToLive()
   
  });

  
  return await modal.present();
  }

  async closeAuto(){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(3000)
    
    this.dismissSplash()

    
   // this.triggerClick() 
  }

  emailLogin(email, password){    
    this.auth.loginUser(email.value, password.value).then(()=>{
      
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.userAny = item;
            this.volverLogin()
            if(this.userAny){
              this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                this.MisEpisodiosMasTarde = item
                
              })
            }
            
          })
         }
        })
        
    })
  }

  async errorLoign(item) {
    const toast = await this.toast.create({
      message: 'Disculpe, El usuario '+item+' no existe en nuestra plataforma, por favor registrese.',
      duration: 6000,
      color:"danger"
    });
    toast.present();
  }

  openLinkBrowser(){
    this.estaEnPlay = false
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/quienes-somos/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }
  openLinkContacto(){
    this.estaEnPlay = false
    this.player.pause()
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://grtv.us/contacto/")

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_self')
  }

  openEncuesta(){

    console.log('estas en la encuesta')
    this.modal.create({
      component: EncuestasComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  openFundacion(){

    this.modal.create({
      component: FundacionComponent,
      cssClass:'my-custom-class',
      
    }).then((modal)=> modal.present())
  }

  async openAdminHipodromo(){
   
    this.estaEnPlay = false
    
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  
    const modal = await this.modal.create({
      component: HipodromoadminComponent, 
      cssClass:'my-custom-class'
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
  
    this.goToLive()
   
  });

  
  return await modal.present();


    
  }

 
async  goToLive(){

  
/*  await  this.player.currentTime(this.player.currentTime()-1)
   await this.player.play()
   */    
   // this.player.currentTime(this.player.currentTime()+1000)


    this.playerw.currentTime(this.playerw.currentTime()+1000)
    this.playerw.play()
   

  
    
  }
 async  puntito(e){
    this.valueRuedita = e.detail.value
    this.otherTime =e.detail.value

    console.log(this.valueRuedita)

  //  console.log(e.detail.value)

    
  
    if(e.detail.value < 0){
      if(this.valueRuedita === -1){
        
        
       this.intervaloTrigger()
        
      }
      if(this.valueRuedita === -60){
        this.intervaloTrigger()
      }
      if(this.valueRuedita  === -3600){
        this.intervaloTrigger()
      }

      if(this.otherTime >= -59){
        this.howMuchBack= this.otherTime + ' seg'
      }
      if(this.otherTime <= -60 && this.otherTime >= -3599 ){
        this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
      }
      if(this.otherTime <= -3600){
        this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
      }


      



//Aqui tienes que poner un if para poner bien las dos funciones


/*  let back = Math.abs(e.detail.value) 
      let time =  this.player.currentTime()
    await this.player.currentTime(this.player.currentTime() - back)
     await this.player.play()
     */

      let back = Math.abs(e.detail.value) 
      let time =  this.player.currentTime()
     await this.player.currentTime(this.player.currentTime() - back)
     await this.player.play()
     

     


    }else{
      this.otherTime = 0
      this.valueRuedita = 0
      e.detail.value = 0
    }
    
    
  }


  intervaloTrigger(){

    //Aqui tienes que poner un if para poner bien las dos funciones
  /*  this.player.addEventListener('play', () => {
      this.isPlayin = 'true'
     });
     this.player.addEventListener("waiting", function(){ 
       this.isPlayin = 'false'
     });
     this.player.addEventListener("pause", function(){ 
      this.isPlayin = 'false'
    });
    */
    var timer = setInterval(() => {

    

      if(this.isPlayin === 'false'){
      }else{
        if(this.otherTime === 0){

          clearInterval(timer)
          this.valueRuedita = 0
          this.howMuchBack = null
        }else{
      
  
          
            this.otherTime += 1
            if(this.otherTime >= -59){
              this.howMuchBack= this.otherTime + ' seg'
            }
            if(this.otherTime <= -60 && this.otherTime >= -3599 ){
              this.howMuchBack = Math.floor(this.otherTime % 3600 / 60) + ' min'
            }
            if(this.otherTime <= -3600){
              this.howMuchBack = Math.floor(this.otherTime / 3600)+ ' hr'
            }
            
  
          
      
        }
      }
    

       
        
      
  }, 1000);
  }


  addTimeTrim(){
    if(this.howManyMaxMin === '10 seg'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 hr'
      this.step = 3600
    this.min = -36000
    this.max = 36000
    }
    
  }
  restTimeTrim(){
    if(this.howManyMaxMin === '10 hr'){
      this.howManyMaxMin = '10 min'
      this.step = 60
    this.min = -600
    this.max = 600
    }else{
      this.howManyMaxMin = '10 seg'
      this.step = 1
    this.min = -10
    this.max = 10
    }
  }

  changeDayEpisodio(da){
    this.day = da
    let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
    this.episodiosByDay = secondFilter.filter(item => item.day === this.day)
     this.episodiosByDay.sort(sortBy('horaEnd')) 
  }
//Aqui van los botones de navegacion
  onEnVivo(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(1)
    
    this.goToLive()
   // this.player.play()

    this.esHipodromo = false
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:5%;';
    this.EnVivoActive = 'active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'En vivo',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
    
  }

  onEpisodios(){
    this.contenidoss.lockSwipes(false);
    this.contenidoss.slideTo(2)
    this.estaEnPlay = false
    this.esHipodromo = false
   

  
      this.playerw.pause()
    
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EpisodiosActive= 'active';
    this.EnCentro='right: 15%;'
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)


    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Episodios',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    



    
  }

  goToHipodromoLocation(){
    console.log(this.contenidos)

    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(0)
    this.estaEnPlay = false
    this.esHipodromo = true

      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive=null;
    this.gacetaIcon = 'filter: invert(1);opacity: 1;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
  }

  knowHpodro(){
    console.log(this.contenidos)
  }

 async onHipodromosFromNew(item){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(0)
    this.esHipodromo = true
    this.estaEnPlay = false
    this.esHipodromo = true
  
      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 1;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    await this.sleep(500)
    this.openHipodromo(item)

    this.dismissNews()



    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Hipodromos',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
  }
 
  onHipodromos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(3)
    this.estaEnPlay = false
    this.esHipodromo = false
    
      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.gacetaActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 1;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
    this.dismissNews()


    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Hipodromos',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }

 async onGacetaTurfromNews(item){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(0)
    this.estaEnPlay = false
    this.esHipodromo = true
  
      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive=null;
    this.gacetaActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:1;filter: invert(0);'
    this.contenidoss.lockSwipes(true)
   

    await this.sleep(750)

    this.openGaceta(item)
    this.dismissNews()

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Gaceta Turf',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }
  onGaceTurf(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(4)
    this.estaEnPlay = false
    this.esHipodromo = false
   
      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.EnVivoActive = null;
    this.JuegosActive=null;
    this.EnCentro='right:20%;';
    this.HipodromosActive=null;
    this.gacetaActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:1;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Gaceta Turf',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }
  onJuegos(){
    this.contenidoss.lockSwipes(false)
    this.contenidoss.slideTo(5);
    this.estaEnPlay = false
    this.esHipodromo = false
    
      this.playerw.pause()
    
    this.EpisodiosActive= null;
    this.HipodromosActive=null;
    this.EnVivoActive = null;
    this.gacetaActive=null;
    this.EnCentro='right:25%;';
    this.JuegosActive='active';
    this.gacetaIcon = 'filter: invert(1);opacity: 0.5;'
    this.turfIcon = 'opacity:0.5;filter: invert(0);'
    this.contenidoss.lockSwipes(true)

    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Comunidad',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    
  }

  //Aqui van los botones del en vivo
  onDestacado(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(0)
    this.onVivoBoton = 'left:3%;'
    this.transpDiv='left: 10%;'
    this.destacadoActive='color:white;background: #000000d6;border-radius:10px;'
    this.progamaActive=null
    this.despuesActive = null;
    this.progra.lockSwipes(true)
  }
  onProgramas(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(1)
    this.onVivoBoton = 'left:35%;'
    this.transpDiv='left: 43%;'
    this.destacadoActive=null
    this.despuesActive = null;
    this.progamaActive='color:white;background: #000000d6;border-radius:10px;'
 

    this.progra.lockSwipes(true)


    
  }
  onVerDespues(){
    this.progra.lockSwipes(false)
    this.progra.slideTo(2)
    this.onVivoBoton = 'left:68%;'
    this.transpDiv='left: 75%;'
    this.despuesActive='color:white;background: #000000d6;border-radius:10px;'
    this.destacadoActive=null
    this.progamaActive=null
    this.progra.lockSwipes(true)
  }

  openMenu(){
    this.menu.enable(true, 'config');
    this.menu.open('config'); 
  }

  openConfiguracionOfApp(){
    this.menu.close('config')
    this.menu.enable(true, 'configuracionApp');
    this.menu.open('configuracionApp'); 
  }
  openHowTo(){
    this.menu.close('config')
    this.menu.enable(true, 'comohacer');
    this.menu.open('comohacer'); 
  }

  redesSocialesOpen(){
    this.menu.enable(true, 'redessociales');
    this.menu.open('redessociales');
  }
  redesSocialesOpenfromConfig(){
    this.menu.close('config')
    this.menu.enable(true, 'redessociales');
    this.menu.open('redessociales');
  }
  openmenuPerfil(){
    this.menu.enable(true, 'perfil');
    this.menu.open('perfil'); 
  }

  openPerfilFromMenu(){
    this.menu.close('config')
    this.menu.enable(true, 'perfil');
    this.menu.open('perfil'); 
  }


  openMisionVision(){

    /*this.modal.create({
      component: MisionvisionComponent,
      cssClass:'my-custom-class',      
    }).then((modal)=> modal.present())*/


  //  this.menu.close('config')
    this.menu.enable(true, 'misionvision');
    this.menu.open('misionvision'); 
  }
  
 async openHowToVideo(item){
    this.estaEnPlay = false
    
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }



      const modal = await this.modal.create({
        component: HowToComponent, 
        cssClass:'my-custom-class',
        componentProps:{
          item:item,
          
        } 
      });
  
      modal.onWillDismiss()
        .then((data) => {
       console.log('lo cerro')
       this.estaEnPlay = true
      
         this.goToLive()
       
      });
  
      return await modal.present();
  }

 async openStreamAdmin(){





    this.estaEnPlay = false
  
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }



      const modal = await this.modal.create({
        component: StreamadminComponent, 
        cssClass:'my-custom-class'
      });
  
      modal.onWillDismiss()
        .then((data) => {
       console.log('lo cerro')
       this.estaEnPlay = true
   
        this.goToLive()
       
      });
  
      return await modal.present();
  }

  backToconfigFromMision(){
    this.menu.close('misionvision')
   
  }


  openSobreNosotros(){
    this.app.getBiosQS().subscribe(item=>{
      this.talentsBios = item

      this.talentsBios.sort(sortBy('spot'))
    })
    this.menu.close('config')
    this.menu.enable(true, 'nosotros');
    this.menu.open('nosotros'); 
  }

  backToConfigFromNosotros(){
    this.menu.close('nosotros')
  }

  verBioTalent(item){
    this.personalData = item
  }
  videoMenu(){
    if(this.videoMenuOpen === 'config-buttons-active'){
      this.videoMenuOpen = 'config-buttons'
    }else{
      this.videoMenuOpen = 'config-buttons-active'
    }
    
  }


  goToLink(url: string){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
}

goToLinkPublicidad(url: string){

 // this.isMyUser
  //aqui va el proceso de revisar si tiene usuario o si lo saco del usuario que no existe
  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

  const web:string = link.changingThisBreaksApplicationSecurity
  this.inBro.create(web, '_system')


 
  
}

async goToLinkPublicidadHipodromo(item:any){


  // this.isMyUser
   //aqui va el proceso de revisar si tiene usuario o si lo saco del usuario que no existe
 
   if(this.userAny){
     let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.hipodromoLink)
 
   const web:string = link.changingThisBreaksApplicationSecurity
   this.inBro.create(web, '_system')
 
  // this.misAdsStats
 
   this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(this.userAny.uid).update({
     hipodromoClick:this.misAdsStats.hipodromoClick + 1
   })
 
   }else{

    const myUserNoLog  =  await this._storage?.get('noLoginUser');

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.hipodromoLink)
 
    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
  
   // this.misAdsStats
  
    this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(myUserNoLog).update({
      hipodromoClick:this.misAdsStats.hipodromoClick + 1
    })
 
   }
   
 }

 async goToLinkPublicidadEpisodio(item:any){


  // this.isMyUser
   //aqui va el proceso de revisar si tiene usuario o si lo saco del usuario que no existe
 
   if(this.userAny){
     let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.linkEpisodio)
 
   const web:string = link.changingThisBreaksApplicationSecurity
   this.inBro.create(web, '_system')
 
  // this.misAdsStats
 
   this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(this.userAny.uid).update({
    episodioClick:this.misAdsStatsEpisodio.episodioClick + 1
   })
 
   }else{

    const myUserNoLog  =  await this._storage?.get('noLoginUser');

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.linkEpisodio)
 
    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
  
   // this.misAdsStats
  
    this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(myUserNoLog).update({
      episodioClick:this.misAdsStatsEpisodio.episodioClick + 1
    })
 
   }
   
 }

 async goToLinkPublicidadDestacado(item:any){


  // this.isMyUser
   //aqui va el proceso de revisar si tiene usuario o si lo saco del usuario que no existe
 
   if(this.userAny){
     let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.linkDestacado)
 
   const web:string = link.changingThisBreaksApplicationSecurity
   this.inBro.create(web, '_system')
 
  // this.misAdsStats
 
   this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(this.userAny.uid).update({
    destacadoClick:this.misAdsStatsDestacado.destacadoClick + 1
   })
 
   }else{

    const myUserNoLog  =  await this._storage?.get('noLoginUser');

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.linkDestacado)
 
    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
  
   // this.misAdsStats
  
    this.db.collection('patrocinadores').doc(item.id).collection('stats').doc(myUserNoLog).update({
      destacadoClick:this.misAdsStatsDestacado.destacadoClick + 1
    })
 
   }
   
 }

goToUrlWeb(url : string){
  
  window.open(url, "_blank");
}


  

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   openEpisodio(item){

    this.estaEnPlay = false
  
      this.playerw.pause()
    
    if(this.streamCount> 0){
      this.playerMin.pause()
    }

    var currentD = new Date();
    var endHappyHourD = new Date(item.endHour);
    
    
    if(currentD > endHappyHourD ){
      this.modal.create({
        component: EpisodioComponent,
        cssClass:'my-custom-class',
        componentProps:{
          item:item,
          
        }
        
      }).then((modal)=> modal.present())
    }else{
      this.episodioNoDisponible(item)
    }


    
    if(this.userAny){
      let d = new Date();
      let day = d.getDate()
      let m = d.getMinutes()
      let h = d.getHours();
      let minutes : string
      let hor : string;

      if(m < 10){
        minutes = '0'+m
      }else{
        minutes = ''+m
      }

      if(h < 10){
        hor = '0'+h
      }else{
        hor = ''+h
      }


    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth


    this.db.collection('activos').doc(this.userAny.uid).update({
          estaEn : 'Viendo un episodio',
          fecha: fechaOnString ,
          hora: hor+':'+minutes
        })
    }
    

    
   
   }
   async episodioNoDisponible(item){
    const actionSheet = await this.action.create({
      header: 'Este episodio aun no esta disponible, que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Guardar para ver mas tarde.',
          icon: 'Bookmark',
          handler: () => {
            if(this.userAny){
              this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.id).set(item).then(()=>{
                this.guardasteElVideo()
                this.onGaceTurf()
              })
            }else{
              this.openmenuPerfil()
              this.noEstasRegistrado()
            }
          }
        },{
        text: 'Cancelar',
        role: 'destructive',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

 async guardasteElVideo(){
      const toast = await this.toast.create({
        message: 'Acabas de Guardar este video para verlo en cualquier momento.',
        duration: 2000,
        position:'bottom',
        color:'success'
      });
      toast.present();
    
  }

  async noEstasRegistrado(){
    const toast = await this.toast.create({
      message: 'Debes iniciar sesion o registrate para guardar este video.',
      duration: 2000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  
}
 async  openHipodromo(item){
    this.estaEnPlay = false
   
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }



      const modal = await this.modal.create({
        component: HipodromoComponent, 
        cssClass:'my-custom-class',
        componentProps:{
          item:item
        }
      });
  
      modal.onWillDismiss()
        .then((data) => {
       console.log('lo cerro')
       this.estaEnPlay = true
       
        this.goToLive()
       
      });
  
      return await modal.present();
    }



   openAtreveANarrar(){
    if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: AtreveanarrarComponent,
      cssClass:'my-custom-class'
      
    }).then((modal)=> modal.present())

    
   }

  async openGaceta(item){
 
    this.estaEnPlay = false
    
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  


    const modal = await this.modal.create({
      component: GacetaComponent, 
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
   
    this.goToLive()
   
  });

  
  return await modal.present();

    
   }

  async openPronostico(item){
 /*   this.estaEnPlay = false
    if(this.isCloudflareOr === true){
      this.player.pause()
    }else{
      this.playerw.pause()
    }
     if(this.streamCount> 0){
      this.playerMin.pause()
    }
    this.modal.create({
      component: PronosticoComponent,
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
      
    }).then((modal)=> modal.present())*/

    




    this.estaEnPlay = false
   
      this.playerw.pause()
    
    if(this.streamCount> 0){
     this.playerMin.pause()
   }
  


    const modal = await this.modal.create({
      component: PronosticoComponent, 
      cssClass:'my-custom-class',
      componentProps:{
        item:item
      }
    });



    modal.onWillDismiss()
    .then((data) => {
   console.log('lo cerro')
   this.estaEnPlay = true
 
    this.goToLive()
   
  });

  
  return await modal.present();
    
   }

   scrollFunction(e){
   
    if(e.srcElement.scrollTop > 30){
     
      this.botonScale = 'bottom: -13%;'
    }
    else{
     
      this.botonScale = null
    }
   }


   async EpisodioFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro de episodios',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todos',
        
        handler: () => {
         this.episodiosPropios = null;
         this.app.getEpisodio().subscribe(item =>{
           this.episodiosPropios = item
           this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true);
           this.episodiosPropios.sort(sortBy('-fecha'))
           this.episodioTitle = 'Todos los Episodios'
           this.episodioTitleIng = 'All Episodes'

         })
        }
      } ,{
        text: 'Por Pais',
        
        handler: () => {

          
         this.PaisFiltroEpisodiosAction()
        }
      },{
        text: 'Por Nombre',
        
        handler: () => {
         this.NombreFiltroEpisodiosAction()
        }
      } ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async HipodromoFiltroAction() {
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'En vivo',
        
        handler: () => {
         
        this.hipodromosAll = this.hipodromosAll.filter(item => item.enVivo === true)
        
        this.hipodromosAll.sort(sortBy('pais'))
        this.hipodromosTitle = 'En Vivo'
        this.hipodromosTitleIng = 'Live'
        }
      }  ,{
        text: 'Todos',
        
        handler: () => {
          this.hipodromosAll = null
        this.app.getHipodromo().subscribe(item =>{
          this.hipodromosAll = item
          
      this.hipodromosAll.sort(sortBy('pais'))
          this.hipodromosTitle = 'Todos los Hipodromos'
          this.hipodromosTitleIng = 'All Racetracks'
        })
        }
      }  ,{
        text: 'Por pais',
        
        handler: () => {
         this.PaisFiltroAction()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async HipodromoGoAction(item) {
    const actionSheet = await this.action.create({
      header: 'Que quieres ver?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Ver Hipodromo',
        
        handler: () => {
         
          this.openHipodromo(item)
        }
      }  ,{
        text: 'Ver Gaceta',
        
        handler: () => {
        this.openGaceta(item)
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }




  async GacetaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Con actividad hoy',
        
        handler: () => {
      this.gacetaHipodromos = this.gacetaHipodromos.filter(item => item.actividad === true)
      
      this.gacetaTitle = 'Con Actividad Hoy'
      this.gacetaTitleIng = 'Running Today'
        }
      }  ,{
        text: 'Todos',
        
        handler: () => {
          this.gacetaHipodromos = null
        this.app.getHipodromo().subscribe(item =>{
          this.gacetaHipodromos = item
          this.gacetaTitle = 'Todos los Hipodromos'
          this.gacetaTitleIng = 'All Racetracks'
        })
        }
      }  ,{
        text: 'Por pais',
        
        handler: () => {
         this.PaisFiltroActionGaceta()
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



  async redesSociales(){
    const actionSheet = await this.action.create({
      header: 'Filtro',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Instagram',
        
        handler: () => {
         /* let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.instagram.com/grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }  ,{
        text: 'Facebook',
        
        handler: () => {
        /*  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://www.facebook.com/Grtv.us/")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }  ,{
        text: 'Twitter',
        
        handler: () => {
        /*  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl("https://twitter.com/grtvus")
      
          const web:string = link.changingThisBreaksApplicationSecurity
          this.inBro.create(web)*/
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


hipodromoToSearch(){
  this.ToSearch = true
  this.hipodromosAll = null
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    this.hipodromosAllRef = item
    
    this.hipodromosAll.sort(sortBy('pais'))

    this.indexOfHipodromo = this.hipodromosAllRef.length
    this.hipodromosTitle = 'Buscar en Todos los Hipodromos'
    this.hipodromosTitleIng = 'Search All Racetracks'
  })
}
GacetaToSearch(){
  this.ToSearchG = true
  this.gacetaHipodromos = null
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item

    this.indexOfGaceta = this.hipodromosAllRef.length
    this.gacetaTitle = 'Buscar en Todos los Hipodromos'
    this.gacetaTitleIng = 'Search All Racetracks'
  })
}
hipodromoToSearchClose(){
  this.ToSearch = false
  this.hipodromosAll = null
  this.textoBuscar=''
  this.app.getHipodromo().subscribe(item =>{
    this.hipodromosAll = item
    
    this.hipodromosAll.sort(sortBy('pais'))
    this.hipodromosTitle = 'Todos los Hipodromos'
    this.hipodromosTitleIng = 'All Racetracks'
  })
  
}
GacetaToSearchClose(){
  this.ToSearchG = false
  this.gacetaHipodromos = null
  this.textoGaceta= ''
  this.app.getHipodromo().subscribe(item =>{
    this.gacetaHipodromos = item
    this.gacetaTitle = 'Todos los Hipodromos'
    this.gacetaTitleIng= 'All Racetracks'
  })
  
}

async filtroPronosHoy(){
  const actionSheet = await this.action.create({
    header: 'Filtro de Pronostico Hoy',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Todos',
        handler: () => {
          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.type === this.pronoIndexIs )
            this.pronostiHoy.sort(sortBy('-hour'))
          })
        }
      },{
        text: 'Por Pais',
        handler: () => {
          this.PaisFiltroActionPronostico()
        }
      }, {
        text: 'Por Talento',
        handler: () => {
          this.TalentoFiltroActionPronostico()
        }
      },{
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => {
        
      }
    }]
  });
  await actionSheet.present();

}

async filtroPronosOtrosDias(){
const actionSheet = await this.action.create({
  header: 'Filtro de Pronostico Dias Anteriores',
  cssClass: 'my-custom-class',
  buttons: [
    {
      text: 'Todos',
      handler: () => {
        let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null
        this.app.getPronostico().subscribe(item=>{
          let ShortDate = day.toString() + ' de ' + this.FullMonth 
          let pronosticosArray:any = item
          pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
    
          this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
          this.pronostiViejos = this.pronostiViejos.filter(item => item.type === this.pronoIndexIs)
          this.pronostiViejos.sort(sortBy('-fecha'))

        })
      }
    },{
      text: 'Por Pais',
      handler: () => {
        this.PaisFiltroActionPronosticoOtrosDias()
      }
    }, {
      text: 'Por Talento',
      handler: () => {
        this.TalentoFiltroActionPronosticootrosDias()
           }
    },{
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => {
      
    }
  }]
});
await actionSheet.present();

}




async filtroDestacadoOtrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro de Destacado Dias Anteriores',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Todos',
        handler: () => {

          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
        }
      },{
        text: 'Por Pais',
        handler: () => {

          this.PaisFiltroActionDestacado()
        }
      }, {
        text: 'Por Hipodromo',
        handler: () => {
          this.porHipodFiltroActionDestacado()

             }
      },{
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => {
        
      }
    }]
  });
  await actionSheet.present();
  
  }



async PaisFiltroActionPronostico(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoPais()
  });
  await actionSheet.present();
}



async PaisFiltroActionDestacado(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsDestacadoPais()
  });
  await actionSheet.present();
}

async porHipodFiltroActionDestacado(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsDestacadoHipodromo()
  });
  await actionSheet.present();
}

async PaisFiltroActionPronosticoOtrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Pais',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoPaisOtrosDias()
  });
  await actionSheet.present();
}

async TalentoFiltroActionPronostico(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Talento',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoTalento()
  });
  await actionSheet.present();
}

async TalentoFiltroActionPronosticootrosDias(){
  const actionSheet = await this.action.create({
    header: 'Filtro por Talento',
    cssClass: 'my-custom-class',
    buttons: this.createButtonsPronosticoTalentootrosDias()
  });
  await actionSheet.present();
}
  async PaisFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtons()
    });
    await actionSheet.present();
  }

  async PaisFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodiosPais()
    });
    await actionSheet.present();
  }


  async NombreFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PorEpisodioFiltroEpisodiosAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons:  this.createButtonsEpisodiosNombre()
    });
    await actionSheet.present();
  }

  async PaisFiltroActionGaceta(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsGaceta()
    });
    await actionSheet.present();
  }

  createButtonsEpisodiosPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyPais(index.name).subscribe(item =>{
            this.episodiosPropios = item
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.name
            this.episodioTitleIng = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  


  createButtonsPronosticoTalento(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.talentName === index.displayName)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.type === this.pronoIndexIs)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  /*createButtonsPronosticoTalento(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.talentName === index.displayName)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }*/
// aqui va el pronosticootros dias
  createButtonsPronosticoTalentootrosDias(){
    let buttons = [];
    for (let index of this.myTalent) {
      let button = {
        text:index.displayName,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.talentName === index.displayName)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.type === this.pronoIndexIs)
            this.pronostiViejos.sort(sortBy('-fecha'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsPronosticoPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiHoy = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item
            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
            this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.pais === index.name)
            this.pronostiHoy = this.pronostiHoy.filter(item => item.type === this.pronoIndexIs)
            this.pronostiHoy.sort(sortBy('-hour'))
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }



  createButtonsDestacadoPais(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {




          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.pais === index.name )
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  createButtonsDestacadoHipodromo(){
    let buttons = [];
    for (let index of this.hipodromosAll) {
      let button = {
        text:index.nombre,
        handler: () => {




          let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
          this.episodioDestacadoOtros = firstFilter.filter(item => item.longDate !== this.EpisodioLongDate)
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
          this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.nombre.includes(index.nombre) )
          this.episodioDestacadoOtros.sort(sortBy('-fecha'))
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsPronosticoPaisOtrosDias(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {

          let d = new Date();
          let n = d.getMonth()
          let day = d.getDate()

          this.pronostiViejos = null

          this.app.getPronostico().subscribe(item=>{
            let ShortDate = day.toString() + ' de ' + this.FullMonth 
            let pronosticosArray:any = item

            pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')
    
            this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.pais === index.name)
            this.pronostiViejos = this.pronostiViejos.filter(item => item.type === this.pronoIndexIs)
      
            this.pronostiViejos.sort(sortBy('-fecha'))
            
          })
          
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  


  createButtonsEpisodiosNombre(){
    let buttons = [];
    for (let index of this.ProgramaName) {
      let button = {
        text:index.nombre,
        handler: () => {
          this.episodiosPropios = null
          this.app.getEpisodiobyNombre(index.nombre).subscribe(item =>{
            this.episodiosPropios = item
            
            this.episodiosPropios = this.episodiosPropios.filter(item => item.propio === true)
            this.episodioTitle = index.nombre
            this.episodioTitleIng = index.nombre
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  

  createButtons(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.hipodromosAll = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.hipodromosAll = item
            
      this.hipodromosAll.sort(sortBy('pais'))
            this.hipodromosTitle = 'Hipodromos de ' + index.name
            this.hipodromosTitleIng = index.name + ' Racetracks'
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  createButtonsGaceta(){
    let buttons = [];
    for (let index of this.PaisName) {
      let button = {
        text:index.name,
        handler: () => {
          this.gacetaHipodromos = null
          this.app.getHipodromobyPais(index.name).subscribe(item =>{
            this.gacetaHipodromos = item
            this.gacetaTitle = 'Hipodromos de ' + index.name
            this.gacetaTitleIng = index.name + ' Racetracks'
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  async CategoriaFiltroAction(){
    const actionSheet = await this.action.create({
      header: 'Filtro por Pais',
      cssClass: 'my-custom-class',
      buttons: this.createButtonsEpisodios()
    });
    await actionSheet.present();
  }

  createButtonsEpisodios(){
    let buttons = [];
    for (let index of this.catName) {
      let button = {
        text:index.name,
        handler: () => {
          this.episodiosAll = null;
          this.app.getEpisodiobyCat(index.name).subscribe(item =>{
            this.episodiosAll = item
            this.episodioTitle = index.name
            this.episodioTitleIng = index.name
          })
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
  buscarG(event){
    this.textoGaceta = event.detail.value;
  }

  buscarE(event){
    this.buscarEpisodio = event.detail.value
  }


  EpisodioToSearch(){

    this.ToSearchE = true
    this.episodiosAll = null
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      let forFilter : any = this.episodiosAll.filter(item => item.propio === true)
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))


      this.indexOfEpisodio = forFilter.length
      
      this.episodioTitle = 'Buscar en Todos los Episodios'
      this.episodioTitleIng = 'Search All Episodes'
    })
  }
  EpisodioToSearchClose(){
    this.ToSearchE = false
    this.episodiosAll = null
    this.buscarEpisodio=''
    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))
      this.episodioTitle = 'Episodios Reciente'
      this.episodioTitleIng = 'Recent Episodes'
    })
    
  }

  openJuego(){
    this.modal.create({
      component: AccComponent ,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   openLogin(){
    this.modal.create({
      component: LoginemailComponent,
      cssClass:'my-custom-class',
    }).then((modal)=> modal.present())
   }

   funcionPrueba(){

    var currentD = new Date();
    /*  var startHappyHourD = new Date();
      startHappyHourD.setHours(10,0,0); // 5.30 pm*/
      var endHappyHourD = new Date('11/14/2021 00:00');



    
   }

   async guardarEpisodio(item){
    var currentD = new Date();
    /* Esta es la forma correcta para armar el DATE 
                    11/14/2021 00:00                */
                    console.log(item.endHour)
      var endHappyHourD = new Date(item.endHour);
      
      if(currentD > endHappyHourD ){
        const actionSheet = await this.action.create({
          header: 'Deseas guardar este episodio?',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: 'Guardar para mas tarde',
              icon: 'bookmark',
              handler: () => {
                this.addGuardarEpisodio(item);
              }
            },{
            text: 'Cancelar',
            role: 'destructive',
            icon: 'close',
            handler: () => {
              
            }
          }]
        });
        await actionSheet.present();
      }else{
        this.episodioNoDisponible(item)
      }
     
    
  } 
  addGuardarEpisodio(item){

    this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.id).set({
      capitulo : item.capitulo,
      categoria:item.categoria,
      cover:item.cover,
      day:item.day,
      descripcion:item.descripcion,
      horario:item.horario,
      link:item.link,
      longDate:item.longDate,
      nombre:item.nombre,
      shortDate:item.shortDate,
      visto:false
    }).then(i =>{
      if(this.userAny){
        this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
          this.MisEpisodiosMasTarde = item
        })
      }
      this.episodioGuardado(item);
      this.onVerDespues()
    })
  }

  async episodioGuardado(item) {
    const toast = await this.toast.create({
      message: 'El Capitulo '+item.nombre+' a sido guardado para ver mas tarde',
      duration: 6000
    });
    toast.present();
  }

/*
  async onLoginGoogle(){

    try{
     this.auth.loginAndroidGoogle().then(i=>{

        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
              this.userAny = item;
              this.volverLogin()
              if(this.userAny){
                this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                  this.MisEpisodiosMasTarde = item
                  
                })
              }else{
                this.db.collection('users').doc(user.uid).set({
                  uid:user.uid,
                  email:user.email,
                  displayName:user.displayName,
                  photoURL:user.photoURL
                }).then(()=>{
                  this.app.getMisEpisodios(this.userAny.uid).subscribe(item =>{
                    this.MisEpisodiosMasTarde = item
                    
                  })
                })
              }
              
            })
           }
          }


        )
      })
     
    }
    catch(error){console.log(error)}
  }
*/
  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file=https://www.youtube.com/watch?v=wq8cfsdnuz4')
    }

  async onLogOut(){
    try{
      this.auth.logout().then(ite =>{
        this.userAny = null
        
          this.menu.enable(true, 'perfil');
          this.menu.close('perfil');

          window.location.reload();
          
        
      })

    }catch(error){console.log(error)}
  }
}
