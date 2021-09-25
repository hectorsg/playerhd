import { AngularFirestore } from '@angular/fire/firestore';
import { TriviaService } from './../../servicios/trivia.service';
import { ModalController, IonSlides, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import sortBy from 'sort-by';
import { Downloader, DownloadRequest } from '@ionic-native/downloader/ngx';
import { NotificationVisibility } from '@ionic-native/downloader';

@Component({
  selector: 'app-gaceta',
  templateUrl: './gaceta.component.html',
  styleUrls: ['./gaceta.component.scss'],
})
export class GacetaComponent implements OnInit {

  @ViewChild('hipodromo', { static: false}) hipodromos: IonSlides;
  @ViewChild('retroP', {static:false}) pngRetro : IonSlides;

  hipodromoSlide = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    direction:'vertical',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  retro={
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    direction:'vertical',
    zoom:true
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
  public retroPng:string;
  public dateFalta:string;
  public raceInfo:any;
  public SinCarreras :boolean;
  constructor(public modal : ModalController, public nav : NavParams, 
      public sanitaizer : DomSanitizer, public app : TriviaService,
      public db : AngularFirestore, private downloader : Downloader, public toastController:ToastController) {}

  ngOnInit() {
  }


  getLink(){
  return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.hip.link)
  }
  

  dismissModal(){

    this.modal.dismiss();
    this.hip= null
    this.sliderLoad = null
  }
  ionViewDidEnter(){
    let d = new Date();
    let n = d.getDay();
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
    this.hip  = this.nav.get('item')
    this.app.getRaces(this.hip.id, this.day).subscribe(item =>{
      this.raceAll = item  

      if(this.raceAll.length === 0){
        this.SinCarreras = true
      }else{
        this.SinCarreras = null
      }

      this.raceAll.sort(sortBy('uid'));

    
      
    })
    this.hipodromos.update().then(item =>{
      this.sliderLoad = true
    } )
    this.hipodromos.lockSwipes(true)

    this.countDown()
  }
  openHorse(ite){
    
    this.CurrentRaceHorse = ite
    this.db.collection('caballos').doc(ite.id).valueChanges().subscribe(item =>{
      this.horseArray = item
      this.vida= this.horseArray.vida
    })
    this.hipodromos.lockSwipes(false);
    this.hipodromos.slideTo(1);
    this.hipodromos.lockSwipes(true);
  }
  VolverGaceta(){
    const retrospecto = document.getElementById("retpecT");
    retrospecto.style.opacity="0"
    const spinner = document.getElementById("spin")
    spinner.style.opacity="1"

    this.hipodromos.lockSwipes(false);
    this.infoCarrera=null
    this.horseArray=null
    this.CurrentRaceHorse=null
    
    this.retroPng = null
    this.hipodromos.slideTo(0);
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
      if(this.raceAll.length === 0){
        this.SinCarreras = true
      }else{
        this.SinCarreras = null
      }
      this.raceAll.sort(sortBy('uid'));

      
    })
  }

  abrirRetrospecto(item){

    this.raceInfo = item

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.retroPng)
    this.hipodromos.lockSwipes(false);

    this.retroPng = link.changingThisBreaksApplicationSecurity

 
    this.hipodromos.slideTo(1);
    this.hipodromos.lockSwipes(true);
    this.pngRetro.update()
    const retrospecto = document.getElementById("retpecT");
    const spinner = document.getElementById("spin")
    retrospecto.addEventListener("load", function(){
      retrospecto.style.opacity="1"
      spinner.style.opacity="0"
    })
  }

  countDown(){
    const topDate = new Date(this.hip.falta);
  
    const updateClock = (date) => {
      if(!date) return;
      let end = date.getTime();
      let now = Date.now();
      let diff = end - now;
      if(diff < 0) { // <- si el reloj ya mostró todo en cero, lo remuevo del DOM
        this.dateFalta=null
        clearInterval(interval);
        
        console.log(' ')
      } else {
        let days = Math.floor(diff / 86400000);
        diff = diff % 86400000
        let hours = Math.floor(diff / 3600000);
        diff = diff % 3600000;
        let minutes = Math.floor(diff / 60000);
        diff = diff % 60000;
        let seconds = Math.floor(diff / 1000);
      
        this.dateFalta = seconds + ' seg'

        if(days > 0 && hours > 0 && minutes >0 && seconds > 0){
          if(days === 1){
            this.dateFalta = days+' Dia'
          }else{
            this.dateFalta = days+' Dias'
          }
        }

        if(days === 0 && hours > 0 && minutes > 0 && seconds > 0){
          if(hours === 1){
            this.dateFalta = hours+' Hr '+ minutes+':'+seconds+' Mins'
          }else{
            this.dateFalta = hours+' Horas'
          }
        }

        if(days === 0 && hours === 0 && minutes > 0 && seconds > 0){
          if(minutes === 1){
            this.dateFalta = minutes+':'+seconds+' Min'
          }else{
            this.dateFalta = minutes+':'+seconds+' Mins'
          }
        }

        if(days === 0 && hours ===0 && minutes === 0 && seconds>0){
          this.dateFalta = seconds + ' Seg'
        }
        
      }
    }
    
    // se llama a la función una vez para que pinte el resultado inmediatamente
    updateClock(topDate);
    // se hace uso de setInterval para cambiar el contador cada 1 segundo
    const interval = setInterval(updateClock, 1000, topDate)
  }

  async descargaConExito(){
    const toast = await this.toastController.create({
      message: 'Archivo descargado con exito.',
      duration: 4000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  }
  
  async descargaFallida(){
    const toast = await this.toastController.create({
      message: 'Hubo un problema, intentelo de nuevo.',
      duration: 4000,
      position:'bottom',
      color:'danger'
    });
    toast.present();
  } 

  descargarAndroid(){
    let sanit:any = this.sanitaizer.bypassSecurityTrustResourceUrl(this.raceInfo.retrospecto)
    let linkDownload = sanit.changingThisBreaksApplicationSecurity
    var request: DownloadRequest = {
      uri: linkDownload,
      title: 'Retrospecto ' + this.raceInfo.shortRaceName + ' '+ this.hip.nombre,
      description: '',
      mimeType: 'application/pdf',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: 'Retrospecto ' + this.raceInfo.shortRaceName + ' '+ this.hip.nombre
      }
  };

  this.downloader.download(request)
  .then((location: string) => this.descargaConExito())
  .catch((error: any) => this.descargaFallida());
  }



}
