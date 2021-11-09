import { AngularFirestore } from '@angular/fire/firestore';
import { TriviaService } from './../../servicios/trivia.service';
import { ModalController, IonSlides, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import sortBy from 'sort-by';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
  public showAd : any = [
    {is : false,id:1},
    {is : false,id:2},
    {is : true,id:3, type:'img'},
    {is : false,id:4},
    {is : true,id:5, type:'video'},
    {is : false,id:6},
    {is : true,id:7, type:'img'},
    {is : true,id:8, type:'video'},
    {is : false,id:9},
    {is : false,id:10},
    {is : true,id:11, type:'img'},
    {is : false,id:12},
    {is : true,id:13, type:'video'},
    {is : false,id:14},
    {is : false,id:15},
    {is : false,id:16},
    {is : true,id:17, type:'img'},
    {is : false,id:18},
    {is : false,id:19},
    {is : true,id:20, type:'video'},
    {is : false,id:21},
  ]

  public adLive : boolean;

  public waitFor : number = 5;

  public canDismiss : boolean;

  public ress :any;
  public patrocinador : any;

  public updateHipodromoCount : number = 0

  public misAdsStatsHipodromo : any;

  public myUserNoLog : string;
  private _storage: Storage | null = null;
  public userAny : any;

  constructor(public modal : ModalController, public nav : NavParams, 
      public sanitaizer : DomSanitizer, public app : TriviaService,
      public db : AngularFirestore,  public toastController:ToastController,
      private storageInterna: Storage, public afAuth : AngularFireAuth,public InBrowser : InAppBrowser) {}

  ngOnInit() {
    this.app.getPatrocinadores().subscribe(item => { 
      let resArray  : any = item

      resArray = resArray.filter(item => item.episodios === true)

      this.patrocinador = resArray[Math.floor((Math.random()*resArray.length))]

    })

    this.gettingOtherUser()
  }

  async  gettingOtherUser(){
    const storage = await this.storageInterna.create();
    this._storage = storage;
    this.myUserNoLog  = await this._storage?.get('noLoginUser');
  }


  getLink(){
  return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.hip.link)
  }
  

  dismissModal(){


    
    if(this.patrocinador){
      if(this.ress.is === true){
        this.adLive = true
        var timerToJump = setInterval(()=>{
          this.waitFor -= 1
    
          if(this.waitFor ===0){
            clearInterval(timerToJump)
            console.log('puedes hacer dismiss')
            this.canDismiss = true
          }
        }, 1000)
      }else{
        this.modal.dismiss()
        this.hip= null
        this.sliderLoad = null
      }
    }else{
      this.modal.dismiss()
      this.hip= null
      this.sliderLoad = null
    }
  }

  puedeCerrar(){
    this.modal.dismiss()
    this.hip= null
    this.sliderLoad = null
  }
  ionViewDidEnter(){

    this.ress =  this.showAd[Math.floor((Math.random()*this.showAd.length))]

    console.log(this.ress)

    if(this.ress.type === 'video'){
      this.waitFor +=5
    }

    this.getUsertoAds()
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  async getUsertoAds(){
    await this.sleep(500)
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;     
          this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item=>{
            this.misAdsStatsHipodromo = item

            if(this.misAdsStatsHipodromo){
    
              if(this.updateHipodromoCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
                  
                    hipodromoView: this.misAdsStatsHipodromo.hipodromoView +1,
                  })
  
                }

               
                this.updateHipodromoCount += 1
              }
    
              
    
              
            }else{
              console.log('aun no tienes estadisticas')

              if(this.ress.is === true){
                this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).set({
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
    
              
            }
          })     
        })
       }else{

        if(this.myUserNoLog !== null){
          this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).valueChanges().subscribe(ite =>{
            let otherStats : any = ite
            this.misAdsStatsHipodromo = otherStats
  
            if(otherStats){
  
              if(this.updateHipodromoCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
                  
                    hipodromoView: otherStats.hipodromoView +1,
                  })
                }
               
                this.updateHipodromoCount += 1
              }
  
            }else{
              if(this.ress.is === true){
                this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).set({
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
             
            }
          })

        }else{
          const id = Math.random().toString(36).substring(2);
          this._storage?.set('noLoginUser', id);

          this.gettingOtherUser()
        }

       }})
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



  goToLink(url:string){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.InBrowser.create(web, '_system')

    if(this.userAny){
      this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
        hipodromoClick :this.misAdsStatsHipodromo.hipodromoClick + 1
      })
    }else{
      if(this.myUserNoLog){
        this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
          hipodromoClick :this.misAdsStatsHipodromo.hipodromoClick + 1
        })
      }
    }
   }



}
