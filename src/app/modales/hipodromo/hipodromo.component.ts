import { AngularFirestore } from '@angular/fire/firestore';
import { TriviaService } from './../../servicios/trivia.service';
import { ModalController, IonSlides, NavParams, ActionSheetController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import sortBy from 'sort-by';
import * as numeral from 'numeral'
import { Storage } from '@ionic/storage';
declare var videojs : any ;


@Component({
  selector: 'app-hipodromo',
  templateUrl: './hipodromo.component.html',
  styleUrls: ['./hipodromo.component.scss'],
})
export class HipodromoComponent implements OnInit {

  @ViewChild('hipodromo', { static: false}) hipodromos: IonSlides;

  @ViewChild('hipodromoTwo', { static: false}) hipdromotwo: IonSlides;

  @ViewChild('playPauseHipodromo') playPauseAccctionHipo : ElementRef;
  
  @ViewChild('pronosticoEnHipodromo', { static: false}) pronoEnHipodroo: IonSlides;

  
  @ViewChild('enVivoActtionHipodr') EnvivoActionClickAaa : ElementRef;
  hipodromoSlide = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 10
  }

  public sliderLoad:boolean;
  public hip :any;
  public livelink:string;
  public raceAll:any;
  public infoCarrera:any;
  public horseArray:any;
  public CurrentRaceHorse:any;
  public vida:any;
  public day:any;
  public pdfSrc:string;
  public playerHip : any;
  public stream : SafeResourceUrl;

  //Dias de carrera
  public racesLun : number;
  public racesMar:number;
  public racesMie:number;
  public racesJue:number;
  public racesVie:number;
  public racesSab:number;
  public racesDom:number;
  public FullMonth : string;
  public repetecionH : any;
  public isLive : boolean;
  public knowIfPlay : boolean;
  //user 
  public isMudo : boolean;
  public userAny : any;
  public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;
  public isForClose : boolean;
  public slideStyle : string;

  public playVideo : string = 'https://cdn3.wowza.com/1/dmcvMEh2dTZzdHhG/VUUvb1Zh/hls/live/playlist.m3u8'

  // fullscreen
  public onFullscreen : boolean;
  
  public toPause : string;
  public estaEnPlay : boolean;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

  public newDataRepe : any;
  public pronostico : any;
  public noticia : any;
  public resumen : any;
  public data : any;
  
  public MyLangIs : string;
  //necesario para video js
  playerss: any ;
  videoHipodromoProno : any;
  private _storage: Storage | null = null;
  playereeehFull:any;

  constructor(public modal : ModalController, public nav : NavParams, 
      public sanitaizer : DomSanitizer, public app : TriviaService,
      public db : AngularFirestore, private InBrowser : InAppBrowser, 
      public afAuth : AngularFireAuth, public action : ActionSheetController,
      private storageInterna: Storage) {
        this.hip  = this.nav.get('item')

      }

  ngOnInit() {
    this.abrirVideo()

    this.isLive = true
    this.toPause = 'opacity:0;'
   
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          
        })
       }
      })


      
      this.whatLang()

      let liiink: string = this.playVideo

      this.stream=  this.sanitaizer.bypassSecurityTrustResourceUrl(liiink)
  
      
  
    
     
   

  }
  
  async abrirVideo(){

   await this.sleep(100)

    this.playerss = videojs(document.getElementById('video-hipodromo'));
    
    this.playerss.poster('../../../../assets/other/poster1.jpg')

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.link)
             
    const web:string = link.changingThisBreaksApplicationSecurity

    
    if(this.hip.enVivo === true){
      this.playerss.src({
        type: 'application/x-mpegURL',
        src: web
      });
    }else{
      this.playerss.src({
        type: 'video/youtube',
        src: web
      });


    }

   

    
    this.playerss.play();
    

    this.playerss.on('play', () => {
      this.knowIfPlay = true
      this.estaEnPlay = true
      this.isMudo = this.playerss.muted()
     });


     


  //  this.triggerClick()
   
  }


  async uitarMudo(){
    this.playerss.muted(false)
   this.isMudo = false
 
   }

   async ponerMudo(){
    this.playerss.muted(true)
    this.isMudo = true
   }

  prueeeba(){
    console.log('Estas haciendo click')
  }

  async darlePlayalVideo(){

    console.log('estas en darle play')
    var playy = setInterval(()=>{

      if(this.knowIfPlay === true){
        console.log('se muriooo')
        clearInterval(playy)
      }else{
        
        console.log('revive')
        document.getElementById("enVivoActtionHipodr").click();
      }
      
    }, 500);
    
  }

  plaayy(){
    this.playerss.play()
  }


 async whatLang(){
    const storage = await this.storageInterna.create();
    this._storage = storage;

    const whatLanIs = await this._storage?.get('Lenguaje');
    this.MyLangIs = whatLanIs
  }


  getLink(){

    return this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.link)
  
 
  }

  

  dismissModal(){

    this.modal.dismiss().then(()=>{

      this.hip= null
    })
  }

  dismissAndSave(){
    this.db.collection('users').doc(this.userAny.uid).collection('config').doc('floatVideo').set({
      videoUrl:this.hip.link,
      hipodromo:this.hip.nombre,
      pais:this.hip.pais
    }).then(()=>{
      this.dismissModal()
    })
  }


  async triggerClick() {
    let el: HTMLElement = this.playPauseAccctionHipo.nativeElement as HTMLElement;
    el.click()
    await this.sleep(250)
    el.click()
}


  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }
  ionViewDidEnter(){
    let view = document.getElementById("hipodromoslide")

    let widtthSli : number = view.offsetWidth
    this.slideStyle = 'width:'+ widtthSli + 'px;'
    let d = new Date();
    let n = d.getDay();
    let m = d.getMonth();
    let day = d.getDate()
    switch(n) {
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



    switch(m) {
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

    this.app.getRacesAll(this.hip.uid).subscribe(item =>{
      this.raceAll = item  

      let Lun : any = this.raceAll.filter(item=> item.day === 'Lun')
      this.racesLun= Lun.length


      let Mar : any = this.raceAll.filter(item=> item.day === 'Mar')
      this.racesMar= Mar.length

      

      let Mie : any = this.raceAll.filter(item=> item.day === 'Mie')
      this.racesMie= Mie.length
      
      
      let Jue : any = this.raceAll.filter(item=> item.day === 'Jue')
      this.racesJue= Jue.length

      

      let Vie : any = this.raceAll.filter(item=> item.day === 'Vie')
      this.racesVie= Vie.length
      

      let Sab : any = this.raceAll.filter(item=> item.day === 'Sab')
      this.racesSab= Sab.length

      

      let Dom : any = this.raceAll.filter(item=> item.day === 'Dom')
      this.racesDom = Dom.length
      

    
      
    })

    this.app.getEpisodio().subscribe(item =>{
      let allEpisodios : any = item

       //Aqui va el filtro de Episodios Destacado
       let firstFilter : any =  allEpisodios.filter(item => item.destacado === true);
      firstFilter = firstFilter.filter(item => item.nombre.includes(this.hip.nombre))
       this.repetecionH = firstFilter.filter(item => item.longDate.includes(this.FullMonth))
       this.repetecionH.sort(sortBy('-fecha'))
    })



    this.app.getPronostico().subscribe(item=>{
      let allPronostico : any = item

      let pronosticosArray:any = item
      pronosticosArray = pronosticosArray.filter(item => item.aproved === 'aprobado')

      this.pronostico = pronosticosArray.filter(item => item.type === 'Pronostico')
      this.pronostico = this.pronostico.filter(item => item.hipodromo === this.hip.nombre)
      //this.pronostico.sort(sortBy('-fecha'))

    //  console.log(this.pronostico)

      this.noticia = pronosticosArray.filter(item => item.type === 'Noticia')
      this.noticia = this.noticia.filter(item => item.hipodromo === this.hip.nombre)
     // this.noticia.sort(sortBy('-fecha'))


      this.resumen = pronosticosArray.filter(item => item.type === 'Resumen')
      this.resumen = this.resumen.filter(item => item.hipodromo === this.hip.nombre)
      //this.resumen.sort(sortBy('-fecha'))

    })

   

   
    this.hipodromos.update()
    this.hipodromos.lockSwipes(true)
    this.hipdromotwo.update()
    this.hipdromotwo.lockSwipes(true)

  }
  openHorse(ite){
    
    this.CurrentRaceHorse = ite
    this.db.collection('caballos').doc(ite.id).valueChanges().subscribe(item =>{
      this.horseArray = item
      this.vida= this.horseArray.vida
    })
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(3);
    this.hipodromos.lockSwipes(true);
  }


  async AskPermisoCambiarVideo(item) {
    const actionSheet = await this.action.create({
      header: 'Espera un momento',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Ver Repeticion',
        role: 'destructive',
        icon: 'Play',
        handler: () => {
          this.playerss.pause();
          this.VerRepetecionSelected(item)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

 async VerRepetecionSelected(item){

  this.newDataRepe = item

  if(this.isLive === true){
    this.isLive = false
  }else{
    
  }



    let liiink: string = item.link

    const web:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(liiink)

   await this.playerss.src({
      type: 'video/youtube',
      src: web.changingThisBreaksApplicationSecurity
    });

    
  await  this.playerss.play();
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   async goToLivee(){
    this.playerss.currentTime(this.playerss.currentTime()+60)
    this.playerss.play()
    
   }




  
 async openFullScreen(){


  let currentTi : number = this.playerss.currentTime()
  this.playerss.pause()
  this.onFullscreen = true


  

  await this.sleep(200)


    
  this.playereeehFull = videojs(document.getElementById('hipodromoFull'))

  this.playereeehFull.poster('../../../assets/other/asd.jpg')
  
  


  
  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.link)
  const web:string = link.changingThisBreaksApplicationSecurity


  if(this.hip.enVivo === true){
    this.playereeehFull.src({
      type: 'application/x-mpegURL',
      src: web
    });
  }else{
    this.playereeehFull.src({
      type: 'video/youtube',
      src: web
    });


  }
  this.playereeehFull.currentTime(currentTi)
  this.playereeehFull.play()

  this.estaEnPlay = true
}





async closeFullScreen(){
  let playerFullTime : number = this.playereeehFull.currentTime()
  this.onFullscreen = false
  this.playereeehFull.pause()
  await this.sleep(200)


  this.playerss = videojs(document.getElementById('video-hipodromo'))

  this.playerss.poster('../../../../assets/other/poster1.jpg')
  
  


  
  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.link)
  const web:string = link.changingThisBreaksApplicationSecurity



  if(this.hip.enVivo === true){
    this.playerss.src({
      type: 'application/x-mpegURL',
      src: web
    });
  }else{
    this.playerss.src({
      type: 'video/youtube',
      src: web
    });


  }

  
  this.playerss.currentTime(playerFullTime)
  this.playerss.play()

  this.estaEnPlay = true

}

  
  pauseStre(){
    this.estaEnPlay = false
    this.playerss.pause()
  }

  pauseStreFull(){
    this.estaEnPlay = false
    //this.playerHFull.pause()
  }


  playStrea(){
    this.estaEnPlay = true
    this.playerss.play()
  }

  
  playStreaFullscreen(){
    this.estaEnPlay = true
  //  this.playerHFull.play()
  }
  VolverGaceta(){
    this.hipodromos.lockSwipes(false);
    this.infoCarrera=null
    this.horseArray=null
    this.CurrentRaceHorse=null
    this.hipodromos.slideTo(2);
    this.hipodromos.lockSwipes(true);
  }
  openInfoHipodromo(){
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(0);
    this.hipodromos.lockSwipes(true)
  }
  openInfoCarrera(item){
    this.infoCarrera = item
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(1);
    this.hipodromos.lockSwipes(true)
  }

  changeDay(dayC){
    this.day = dayC
    this.raceAll= null;
    this.app.getRaces(this.hip.id, this.day).subscribe(item =>{
      this.raceAll = item
      
    })
  }

  abrirRetrospecto(){
    this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(3);
    this.hipodromos.lockSwipes(true);
  }

  openLinkBrowser(){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.web)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.InBrowser.create(web, '_system')
  }

  openLinkBrowserred(item){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.InBrowser.create(web, '_system')
  }

  slideMaker(e:any){

    if(e.detail.value === 'historia'){
      this.hipodromos.lockSwipes(false)
      this.hipodromos.slideTo(2)
      this.hipodromos.lockSwipes(true)
    }

    if(e.detail.value === 'repetici'){
      this.hipodromos.lockSwipes(false)
      this.hipodromos.slideTo(0)
      this.hipodromos.lockSwipes(true)
    }
    if(e.detail.value === 'actividad' ){
      this.hipodromos.lockSwipes(false)
      this.hipodromos.slideTo(1)
      this.hipodromos.lockSwipes(true)
    }
  }

  slidetwo(e:any){
    if(e.detail.value === 'noticia'){
      this.hipdromotwo.lockSwipes(false)
      this.hipdromotwo.slideTo(2)
      this.hipdromotwo.lockSwipes(true)
    }
    if(e.detail.value === 'resum'){
      this.hipdromotwo.lockSwipes(false)
      this.hipdromotwo.slideTo(0)
      this.hipdromotwo.lockSwipes(true)
    }

    if(e.detail.value === 'prono'){
      this.hipdromotwo.lockSwipes(false)
      this.hipdromotwo.slideTo(1)
      this.hipdromotwo.lockSwipes(true)
    }

  }
  async verPost(item){
    this.data = item

   await this.sleep(200)

    this.videoHipodromoProno = videojs(document.getElementById('vioenHipo'))

    this.videoHipodromoProno.poster('../../../../assets/other/poster2.jpg')
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoUrl)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.videoHipodromoProno.src({
      type: 'video/mp4',
      src: web
    });

    this.videoHipodromoProno.play()
    var timerPron = setInterval(()=>{
      let current = this.videoHipodromoProno.currentTime()
      let dura = this.videoHipodromoProno.duration()
      dura = numeral(dura).format(0)


      let durat:number = parseInt(dura)
      
      current = numeral(current).format(0)

      let currentT : number = parseInt(current) 

     let d = Number(durat);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    let minuteD : string
    let secondsD : string

    if(m < 10){
      minuteD = '0'+m
    }else{
      minuteD = ''+m
    }

    if(s < 10 ){
      secondsD = '0'+s
    }else{
      secondsD = ''+s
    }

    let c = Number(currentT);
    var hc = Math.floor(c / 3600);
    var mc = Math.floor(c % 3600 / 60);
    var sc = Math.floor(c % 3600 % 60);

    

    let minutes : string 
    let seconds : string

    if(mc < 10){
      minutes = '0'+mc
    }else{
      minutes = ''+mc
    }

    if(sc < 10 ){
      seconds = '0'+sc
    }else{
      seconds = ''+sc
    }


    this.currentVideoDuration = minutes+ ':' + seconds+ ' / '+ minuteD + ':' + secondsD

    if(this.isForClose === true){
      clearInterval(timerPron);
    }
      
    }, 250)
    this.isPlayin = true
    this.isPaused  = false

    this.updateSlider()

  }


  async updateSlider(){
    await this.sleep(1000)
   
    
    this.pronoEnHipodroo.update()
     }
   
     playPauseVideo(){
       if(this.isPlayin=== true){
         this.videoHipodromoProno.pause()
         this.isPlayin = false
         this.isPaused = true
        
         this.blur = 'background: rgba(0, 0, 0, 0.473);'
       }else{
         this.videoHipodromoProno.play()
         this.isPlayin = true
       this.isPaused  = false
       this.blur = null
       }
      
     }

     cerrarPronos(){
       this.videoHipodromoProno.pause()
       this.abrirVideo()
       this.data = null
     }
}
