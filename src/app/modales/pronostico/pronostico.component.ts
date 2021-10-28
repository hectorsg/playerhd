import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as numeral from 'numeral'
import { TriviaService } from 'src/app/servicios/trivia.service';


declare var videojs : any ;

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.scss'],
})
export class PronosticoComponent implements OnInit {

  
  @ViewChild('hipDate', { static: false}) HIdate: IonSlides;
  
  @ViewChild('playpausOnPronostico') playPauseAccctionPronos : ElementRef;

  pronVideo :any
  public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;
  public data : any;
  public isForClose : boolean;

  public patrocinador : any;

  public adLive : boolean;

  public waitFor : number = 5;

  public canDismiss : boolean;

  public ress :any;

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

  public updateHipodromoCount : number = 0

  public misAdsStatsPronostico : any;

  public myUserNoLog : string;
  private _storage: Storage | null = null;
  public userAny : any;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }
  constructor(public modal : ModalController, public nav : NavParams,  public sanitaizer : DomSanitizer, public app : TriviaService,
              public inBro : InAppBrowser, private storageInterna: Storage, public afAuth : AngularFireAuth, public db : AngularFirestore ) { }

  ngOnInit() {
    this.isForClose = false

    this.data = this.nav.get('item')
    this.openVideo()

    
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

  ionViewDidEnter(){

    
    this.ress =  this.showAd[Math.floor((Math.random()*this.showAd.length))]

    console.log(this.ress)

    if(this.ress.type === 'video'){
      this.waitFor +=5
    }

   
    
   
  }

  async getUsertoAds(){
    await this.sleep(500)
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;     
          this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item=>{
            this.misAdsStatsPronostico = item

            if(this.misAdsStatsPronostico){
    
              if(this.updateHipodromoCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
                  
                    pronosticoView: this.misAdsStatsPronostico.pronosticoView +1,
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
            this.misAdsStatsPronostico = otherStats
  
            if(otherStats){
  
              if(this.updateHipodromoCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
                  
                    pronosticoView: otherStats.pronosticoView +1,
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




  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

 async  openVideo(){ 
   await this.sleep(200)
    this.pronVideo = videojs(document.getElementById('pronpruebapruebaaaa'))

    this.pronVideo.poster('../../../../assets/other/poster2.jpg')
    
    


  

    if(this.data.videoOptimizado === 'no tiene'){
      let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoUrl)

      const web:string = link.changingThisBreaksApplicationSecurity
      console.log('no esta optimizado')
      this.pronVideo.src({
        type: 'video/mp4',
        src: web
      });
    }else{

      let link2:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoOptimizado)

    const web2:string = link2.changingThisBreaksApplicationSecurity
      console.log('ya se optimizo')
      this.pronVideo.src({
        type: 'application/x-mpegURL',
        src: web2
      });
    }
    

   
    
    this.pronVideo.play()

    var timerPron = setInterval(()=>{
      let current = this.pronVideo.currentTime()
      let dura = this.pronVideo.duration()
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
    
 // this.pronVideo.play()
    this.isPlayin = true
    this.isPaused  = false
    

    
    this.updateSlider()
    

   }



   async triggerClick() {
     console.log(this.currentVideoDuration)
     console.log('clicando')
    let el: HTMLElement = this.playPauseAccctionPronos.nativeElement as HTMLElement;
    el.click()
    await this.sleep(250)
    el.click()
}


 async updateSlider(){
 await this.sleep(1000)

 
 this.HIdate.update()
  }

  playPauseVideo(){
    

  //  this.cloudPlayer.pause
   if(this.isPlayin=== true){
      this.pronVideo.pause()
      this.isPlayin = false
      this.isPaused = true
     
      this.blur = 'background: rgba(0, 0, 0, 0.473);'
    }else{
      this.pronVideo.play()
      this.isPlayin = true
    this.isPaused  = false
    this.blur = null
    }
   
  }


  closeModal(){


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
        this.modal.dismiss();
        this.isForClose = true
      }
    }else{
      this.modal.dismiss()
      this.isForClose = true
    }


   
  }
  
goToLink(url: string){
  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

  const web:string = link.changingThisBreaksApplicationSecurity
  this.inBro.create(web, '_system')


  if(this.userAny){
    this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
      pronosticoClick :this.misAdsStatsPronostico.pronosticoClick + 1
    })
  }else{
    if(this.myUserNoLog){
      this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
        pronosticoClick :this.misAdsStatsPronostico.pronosticoClick + 1
      })
    }
  }
}

puedeCerrar(){
  this.modal.dismiss()
}

  


}
