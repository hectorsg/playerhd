import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';
import * as numeral from 'numeral'


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

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }
  constructor(public modal : ModalController, public nav : NavParams,  public sanitaizer : DomSanitizer, ) { }

  ngOnInit() {
    this.isForClose = false
  }

  ionViewDidEnter(){

    this.data = this.nav.get('item')

    this.openVideo()
    
   
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

 async  openVideo(){
   await this.sleep(200)
    this.pronVideo = videojs(document.getElementById('pronpruebapruebaaaa'))

    this.pronVideo.poster('../../../../assets/other/poster2.jpg')
    
    


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoUrl)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.pronVideo.src({
      type: 'video/mp4',
      src: web
    });
    
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
    this.modal.dismiss()

    this.isForClose = true
  }


}
