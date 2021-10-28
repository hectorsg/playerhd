import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonSlides, ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';
import * as numeral from 'numeral'
import { DomSanitizer } from '@angular/platform-browser';
declare var videojs : any ;


@Component({
  selector: 'app-storiesadmin',
  templateUrl: './storiesadmin.component.html',
  styleUrls: ['./storiesadmin.component.scss'],
})
export class StoriesadminComponent implements OnInit {

  
  
  @ViewChild('hipDate', { static: false}) AdminHIdate: IonSlides;

    public myStories : any;
    public userAny : any;
    public data : any;

    public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;
  public isForClose : boolean;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

    previewMis :any
  constructor(public modal : ModalController, public app : TriviaService, public afAuth : AngularFireAuth, 
  public db : AngularFirestore, public sanitaizer : DomSanitizer) { }

  ngOnInit() {

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
          this.app.getPronostico().subscribe(item=>{
            this.myStories = item
            this.myStories = this.myStories.filter(item => item.talentName === this.userAny.displayName)

            this.myStories.sort(sortBy('-fecha'))
      
          })
        })
       }  
      })

   
  }

  dismissModal(){
    this.modal.dismiss()
  }

  DeleteStory(item){
    this.db.collection('pronostico').doc(item.id).delete()
  }

  async verStorie(data){



    this.data = data
    
    await this.sleep(500)
    
    this.previewMis = videojs(document.getElementById('adminVideoMis'))

    this.previewMis.poster('../../../../assets/other/poster2.jpg')
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.data.videoUrl)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.previewMis.src({
      type: 'video/mp4',
      src: web
    });

    this.previewMis.play()
    var timerPron = setInterval(()=>{
      let current = this.previewMis.currentTime()
      let dura = this.previewMis.duration()
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   playPauseVideo(){
    if(this.isPlayin=== true){
      this.previewMis.pause()
      this.isPlayin = false
      this.isPaused = true
     
      this.blur = 'background: rgba(0, 0, 0, 0.473);'
    }else{
      this.previewMis.play()
      this.isPlayin = true
    this.isPaused  = false
    this.blur = null
    }
   
  }


  
  closePrevio(){
    
    this.previewMis.pause()
    this.data = null
  }

  async updateSlider(){
    await this.sleep(1000)
    this.AdminHIdate.update()
     }

}
