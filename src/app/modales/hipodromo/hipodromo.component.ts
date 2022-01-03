import { AngularFirestore } from '@angular/fire/firestore';
import { TriviaService } from './../../servicios/trivia.service';
import { ModalController, IonSlides, NavParams, ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import sortBy from 'sort-by';
import * as numeral from 'numeral'
import { Storage } from '@ionic/storage';
import { IntersitialComponent } from '../intersitial/intersitial.component';
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
  public specialStyleRepro : string

  public updateHipodromoCount : number = 0

  public misAdsStatsHipodromo : any;

  public myUserNoLog : string;

  public estaSemanaNohay : boolean = false;

  public dayOfTheWeek : string;

  public mesEstreno : string;

  public monthNum : string;

  public month : string;

  public EpisodioLongDate : string;

  public EpisodioShortDate : string;

  public superShortDate : string;

  public FechaDate : string;

  public testlink : SafeResourceUrl ;

  constructor(public modal : ModalController, public nav : NavParams, 
      public sanitaizer : DomSanitizer, public app : TriviaService,
      public db : AngularFirestore, private InBrowser : InAppBrowser, 
      public afAuth : AngularFireAuth, public action : ActionSheetController,
      private storageInterna: Storage, public pop : PopoverController, public toast : ToastController) {
        this.hip  = this.nav.get('item')

      }

  ngOnInit() {
    if(this.hip.linkType === 'Normal' ){
    // 

    const withoutLastFourChars = this.hip.youtube.slice(this.hip.youtube.length -11);


    this.testlink  =  this.sanitaizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + withoutLastFourChars)


    console.log(this.testlink) 
    }else{
      this.specialStyleRepro = 'height:max-content;'
    }



   

    this.gettingOtherUser()
   

    this.isLive = true
    this.toPause = 'opacity:0;'
   
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          
        })
       }
      })

      this.app.getPatrocinadores().subscribe(item => { 
        let resArray  : any = item
  
        resArray = resArray.filter(item => item.episodios === true)
  
        this.patrocinador = resArray[Math.floor((Math.random()*resArray.length))]
  
      })


      
      this.whatLang()

      let liiink: string = this.playVideo

      this.stream=  this.sanitaizer.bypassSecurityTrustResourceUrl(liiink)
  
      
  
    
     
   

  }


  async presentPopover() {
    this.modal.dismiss()
    const popover = await this.pop.create({
      component: IntersitialComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        hip:this.hip
      },
      translucent: true
    });
    await popover.present();
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


  guardarParaMasTarde(item){


    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();


    let hour = d.getHours();
    let minutes = d.getMinutes();

    let hourD : string;
    let minuteD : string;



    if(hour < 10){
      hourD = '0'+hour
    }else{
      hourD = ''+hour
    }

    if(minutes < 10 ){
      minuteD = '0'+minutes
    }else{
      minuteD = ''+minutes
    }


    
    let endHoour : string = hourD+':'+minuteD

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        this.mesEstreno = '1';
        this.monthNum = '01'
        break;
      case 1:
        this.FullMonth = "Febrero";
        this.mesEstreno = '2'
        this.monthNum = '02'
        break;
      case 2:
        this.FullMonth = "Marzo";
        this.mesEstreno = '3'
        this.monthNum = '03'
        break;
      case 3:
        this.FullMonth = "Abril";
        this.mesEstreno = '4'
        this.monthNum = '04'
        break;
      case 4:
        this.FullMonth = "Mayo";
        this.mesEstreno = '5'
        this.monthNum = '05'
        break;
      case 5:
        this.FullMonth = "Junio";
        this.mesEstreno = '6'
        this.monthNum = '06'
        break;
      case 6:
        this.FullMonth = "Julio";
        this.mesEstreno = '7'
        this.monthNum = '07'
        break;
      case 7:
          this.FullMonth = "Agosto";
          this.mesEstreno = '8'
          this.monthNum = '08'
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          this.mesEstreno = '9'
          this.monthNum = '09'
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          this.mesEstreno = '10'
          this.monthNum = '10'
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          this.mesEstreno = '11'
          this.monthNum = '11'
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          this.mesEstreno = '12'
          this.monthNum = '12'
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




    switch(today) {
      case 0:
        this.dayOfTheWeek = "Dom";
        break;
      case 1:
        this.dayOfTheWeek = "Lun";
        break;
      case 2:
        this.dayOfTheWeek = "Mar";
        break;
      case 3:
        this.dayOfTheWeek = "Mie";
        break;
      case 4:
        this.dayOfTheWeek = "Jue";
        break;
      case 5:
        this.dayOfTheWeek = "Vie";
        break;
      case 6:
        this.dayOfTheWeek = "Sab";
    }


    let endHourCode = this.mesEstreno +'/'+day+ '/'+ year + ' 19:00'
    this.EpisodioLongDate = day + ' de ' + this.FullMonth + ' de ' + year;
    this.EpisodioShortDate = this.dayOfTheWeek +' '+ day +'/'+this.mesEstreno;
    let fechaFilter = this.mesEstreno+day
    this.superShortDate = day + ' de '+ this.FullMonth
    
    if(numeral(day).value() >= 0 && numeral(day).value()<10){
      this.FechaDate = this.monthNum + '0'+day
    }else{
      this.FechaDate = this.monthNum+day 
    }


    this.superShortDate = day + ' de '+ this.FullMonth

    let ingShortDate = this.month + ' '+ day

    let horarioVar : string = item.startHour + '/'+endHoour




    this.db.collection('users').doc(this.userAny.uid).collection('vermastarde').doc(item.uid+day+this.monthNum).set({
      nombre:item.nombre,
      capitulo:1,
      link:item.youtube,
      categoria: 'Hipismo' ,
      horario:'12:00/19:30',
      descripcion:'¡Repetición de los mejores días de carreras del mundo! Sólo por GRTV',
      cover:item.cover,
      shortDate:this.EpisodioShortDate,
      longDate:this.EpisodioLongDate,
      day:this.dayOfTheWeek,
      destacado:true,
      endHour:endHourCode,
      semanaActiva:false,
      horaEnd:'19:30',
      pais:item.pais,
      propio:false,
      fecha:this.FechaDate,
      ad:false
    }).then(()=>{
      this.guardasteElVideo()
    })
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

    return this.sanitaizer.bypassSecurityTrustResourceUrl(this.hip.youtube)
  
 
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
        this.modal.dismiss().then(()=>{

          this.hip= null
        })
      }
    }else{
      this.modal.dismiss().then(()=>{

        this.hip= null
      })
    }
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

     
    this.ress =  this.showAd[Math.floor((Math.random()*this.showAd.length))]

    console.log(this.ress)

    if(this.ress.type === 'video'){
      this.waitFor +=5
    }

    this.getUsertoAds()
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
      
      if(this.racesDom === 0 && this.racesJue === 0 && this.racesLun === 0 && this.racesMar === 0 && this.racesMie === 0 && this.racesSab  === 0 && this.racesVie ===0){
        this.estaSemanaNohay = true
      }
    
      
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
    this.hipodromos.slideTo(3);
    this.hipodromos.lockSwipes(true);
  }

  async  gettingOtherUser(){
    const storage = await this.storageInterna.create();
    this._storage = storage;
    this.myUserNoLog  = await this._storage?.get('noLoginUser');
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
        //  this.playerss.pause();
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
    this.hip.linkType = 'Normal'
    this.specialStyleRepro = null
  }else{
    
  }

  this.testlink =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.link)


  console.log(this.testlink)

  /*  let liiink: string = item.link

    const web:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(liiink)

   await this.playerss.src({
      type: 'video/youtube',
      src: web.changingThisBreaksApplicationSecurity
    });

    
  await  this.playerss.play();*/
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   async goToLivee(){
  /*  this.playerss.currentTime(this.playerss.currentTime()+60)
    this.playerss.play()*/

    this.isLive = true
    this.hip.linkType = 'Cloudflare'
    this.specialStyleRepro = 'height:max-content;'
    
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
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoOptimizadoA)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.videoHipodromoProno.src({
      type: 'application/dash+xml',
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
       

       if(this.hip.linkType === 'Normal' ){
        this.abrirVideo()
      }else{
        this.specialStyleRepro = 'height:max-cotent;'
      }
       this.data = null
     }

     puedeCerrar(){
       this.modal.dismiss()
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
