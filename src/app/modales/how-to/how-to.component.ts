import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavParams } from '@ionic/angular';

declare var videojs : any ;

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
})
export class HowToComponent implements OnInit {

  public howToData : any
  public howToVideoPlayer : any;

  constructor(public nav : NavParams, public sanitaizer : DomSanitizer, public modal : ModalController) { }

  ngOnInit() {
    this.howToData = this.nav.get('item')

    console.log(this.howToData)
  }


  ionViewDidEnter(){
    this.howToVideoPlayer = videojs(document.getElementById('howToVideoHome'));
     
    this.howToVideoPlayer.poster('../../../../assets/other/poster1.jpg')

    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.howToData.video)
             
    const web:string = link.changingThisBreaksApplicationSecurity

 

    this.howToVideoPlayer.src({
     type: 'video/mp4',
     src: web
   });

   

    
    this.howToVideoPlayer.play();
  }

  dismissModal(){
    this.modal.dismiss()
  }

}
