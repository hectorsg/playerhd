import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
//import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


declare var videojs : any ;

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrls: ['./episodio.component.scss'],
})
export class EpisodioComponent implements OnInit {

  public episodioItem:any;
  public linkVideo : string = '92fcf74232c05b7449e22c665583d3ed'
  public slideStyle : string;
  public viewIs : string = ' '

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
  
  //necesario para video js
  playerH: any ;
  playerHFull: any;

  public Episodios : any;
  public otherEpisodios:any;
  public isPlayin:string;
  public isPlayind:string;
  public onFullscreen : boolean;
  public reproductoIs : string;


  public toPause : string;
  public estaEnPlay : boolean;
  public VivoConfig : string;
  public episodiosMas : any;
  public isPropio : boolean;

  public isDestacado : boolean;
  public adLive : boolean;

  public waitFor : number = 5;

  public canDismiss : boolean;

  public ress :any;
  public patrocinador : any;

  public userAny : any;
  public myUserNoLog : string;

  private _storage: Storage | null = null;

  public misAdsStatsEpisodio : any;

  public updateEpisodiCount : number = 0
  
  @ViewChild('masCapitulos', { static: false}) masCapituloss: IonSlides;
  @ViewChild('playPauseEpisodio') playPauseAccctionEpi : ElementRef;

  constructor(public modal : ModalController, public nav : NavParams,public sanitaizer : DomSanitizer, 
              public app : TriviaService /*, private admobFree: AdMobFree*/ , public inBro : InAppBrowser, public afAuth : AngularFireAuth,
              public db : AngularFirestore, private storageInterna: Storage) { }


  masEpisodios={
      initialSlide: 0,
      slidesPerView: 2,
      speed: 600
  }

  ngOnInit() {
    this.reproductoIs = 'min-height:25%;'
    this.episodioItem = this.nav.get('item')
   // this.misAdsStatsEpisodio = this.nav.get('misAdsStatsEpisodio')

    this.gettingOtherUser()

    if(this.episodioItem.descripcion.includes('Repetición')){
      this.isDestacado = true
    }else{
      this.isDestacado = false
    }
    this.toPause = 'opacity:0;'




    this.app.getPatrocinadores().subscribe(item => { 
      let resArray  : any = item

      resArray = resArray.filter(item => item.episodios === true)

      this.patrocinador = resArray[Math.floor((Math.random()*resArray.length))]

    })

    


    
  



  }

  


  onFullscreengive(){
    this.estaEnPlay = true
  }


 async openFullScreen(){


    let currentTi : number = this.playerH.currentTime()
    this.playerH.pause()
    this.onFullscreen = true


      console.log('espera')

    await this.sleep(700)
    console.log('esperaste un segundo')
    this.playPuaseAction()

      
    this.playerHFull = videojs(document.getElementById('episodioFulll'))

    this.playerHFull.poster('../../../assets/other/asd.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerHFull.src({
      type: 'video/youtube',
      src: web
    });
    this.playerHFull.currentTime(currentTi)
    this.playerHFull.play()

    this.estaEnPlay = true
  }

  pauseStre(){
    this.estaEnPlay = false
    this.playerH.pause()
  }

  pauseStreFull(){
    this.estaEnPlay = false
    this.playerHFull.pause()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  playStrea(){
    this.estaEnPlay = true
    this.playerH.play()
  }

  
  playStreaFullscreen(){
    this.estaEnPlay = true
    this.playerHFull.play()
  }

  async playPuaseAction(){   
    if(this.toPause === 'opacity:0;'){

      this.toPause = 'opacity:1;'
    }else{
      
    this.toPause = 'opacity:0;'
    }

  }

 async closeFullScreen(){
    let playerFullTime : number = this.playerHFull.currentTime()
    this.onFullscreen = false
    this.playerHFull.pause()
    await this.sleep(1000)
    this.playPuaseAction()


    this.playerH = videojs(document.getElementById('episodio'))

    this.playerH.poster('../../../../assets/other/poster1.jpg')
    
    


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
    const web:string = link.changingThisBreaksApplicationSecurity

    this.playerH.src({
      type: 'video/youtube',
      src: web
    });
    this.playerH.currentTime(playerFullTime)
    this.playerH.play()

    this.estaEnPlay = true

  }

  getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.episodioItem.link)
    }

  async  gettingOtherUser(){
      const storage = await this.storageInterna.create();
      this._storage = storage;
      this.myUserNoLog  = await this._storage?.get('noLoginUser');
    }

  dissmissModal(){
  //  

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
    }
  }else{
    this.modal.dismiss()
  }
    

    

  }

  puedeCerrar(){
    this.modal.dismiss();
  }
  ionViewDidEnter(){
    let view = document.getElementById("cont")

    let widtthSli : number = view.offsetWidth
    this.slideStyle = 'width:'+ widtthSli + 'px;'
    if(this.isDestacado === true){
      this.reproductoIs = 'min-height:25%;height:30%'
      this.viewIs = 'height:100%;'
      this.playerH = videojs(document.getElementById('episodio'))

      this.playerH.poster('../../../../assets/other/poster1.jpg')
      
      
  
  
      
      let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.episodioItem.link)
      const web:string = link.changingThisBreaksApplicationSecurity
  
      this.playerH.src({
        type: 'video/youtube',
        src: web
      });
  
      this.playerH.play()
  
      this.estaEnPlay = true
    }
  
     
    this.ress =  this.showAd[Math.floor((Math.random()*this.showAd.length))]

    console.log(this.ress)

    if(this.ress.type === 'video'){
      this.waitFor +=5
    }


    this.getUsertoAds()

   
   
   

    //this.triggerClick()


    this.app.getMisEpisodiosVermas().subscribe(item => { 
      this.episodiosMas = item

      this.episodiosMas = this.episodiosMas.filter(item => item.longDate === this.episodioItem.longDate)
      this.episodiosMas.sort(sortBy('horaEnd'));
    })


    
  }

  async getUsertoAds(){
    await this.sleep(500)
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;     
          this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).valueChanges().subscribe(item=>{
            this.misAdsStatsEpisodio = item

            if(this.misAdsStatsEpisodio){
    
              if(this.updateEpisodiCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
                  
                    episodioView: this.misAdsStatsEpisodio.episodioView +1,
                  })
  
                }

               
                this.updateEpisodiCount += 1
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
            this.misAdsStatsEpisodio = otherStats
  
            if(otherStats){
  
              if(this.updateEpisodiCount === 0){

                if(this.ress.is === true){
                  this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
                  
                    episodioView: otherStats.episodioView +1,
                  })
                }
               
                this.updateEpisodiCount += 1
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

  async triggerClick() {
    let el: HTMLElement = this.playPauseAccctionEpi.nativeElement as HTMLElement;
    el.click()
    await this.sleep(250)
    el.click()
}

goToLink(url: string){
  let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)
  const web:string = link.changingThisBreaksApplicationSecurity
  this.inBro.create(web, '_system')

  if(this.userAny){
    this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.userAny.uid).update({
      episodioClick :this.misAdsStatsEpisodio.episodioClick + 1
    })
  }else{
    if(this.myUserNoLog){
      this.db.collection('patrocinadores').doc(this.patrocinador.id).collection('stats').doc(this.myUserNoLog).update({
        episodioClick :this.misAdsStatsEpisodio.episodioClick + 1
      })
    }
  }
}
/*
  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        autoShow: true,
        id: "ca-app-pub-1546004963529341/8553930529"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
}

showRewardVideoAds(){
  let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
      isTesting: true, // Remove in production
      autoShow: true//,
      //id: "ca-app-pub-1546004963529341/8553930529"
  };
  this.admobFree.rewardVideo.config(RewardVideoConfig);
  this.admobFree.rewardVideo.prepare().then(() => {
  }).catch(e => alert(e));
}
*/

}
