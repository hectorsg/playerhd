import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import * as numeral from 'numeral'
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var videojs : any ;
@Component({
  selector: 'app-optimizacion',
  templateUrl: './optimizacion.component.html',
  styleUrls: ['./optimizacion.component.scss'],
})
export class OptimizacionComponent implements OnInit {


  public pronList : any;
  public preview : boolean;
  public blur : string;
  public currentVideoDuration : string;
  public isPlayin : boolean;
  public isPaused : boolean;
  public previewItem : any;
  public FullMonth : string;


  public pronostiHoy : any;

  public pronostiViejos : any;
  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

  
  @ViewChild('hipDate', { static: false}) HIAdmindate: IonSlides;
  
  prevAdminVideo :any

  constructor(public modal : ModalController, public sanitaizer : DomSanitizer, public app : TriviaService,
              public inBro : InAppBrowser, public action : ActionSheetController) { }

  ngOnInit() {
    this.app.getPronostico().subscribe(item => {
      let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
      let ShortDate = day.toString() + ' de ' + this.FullMonth 
      let res : any = item
      let pronosticosArray : any
      pronosticosArray = res.filter(item => item.aproved === 'aprobado')
      this.pronostiHoy = pronosticosArray.filter(item=> item.date === ShortDate)
      this.pronostiHoy.sort(sortBy('-hour'))


      this.pronostiViejos = pronosticosArray.filter(item => item.date !== ShortDate)

      this.pronostiViejos.sort(sortBy('-fecha'))
    })

  }


  goBack(){
    
  }

  goToLink(url: string){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
}



async whatToDo(item){
  const actionSheet = await this.action.create({
    header: 'Espera un momento',
    cssClass: 'my-custom-class',
    buttons: [
      {
        text: 'Descargar Video',
        icon: 'cloud-download',
        handler: () => {
          this.goToLink(item)
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


  cerrarModal(){
    this.modal.dismiss()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }


  async previewVideo(item){
    this.preview = true
    this.previewItem = item
  await  this.sleep(1000)

    this.prevAdminVideo = videojs(document.getElementById('prevAdmin'))

   this.prevAdminVideo.poster('../../../../assets/other/poster2.jpg')
   
   this.HIAdmindate.update()


   
   let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.videoUrl)

   const web:string = link.changingThisBreaksApplicationSecurity

   this.prevAdminVideo.src({
     type: 'video/mp4',
     src: web
   });

   this.prevAdminVideo.play()
   var timer = setInterval(()=>{
     let current = this.prevAdminVideo.currentTime()
     current = numeral(current).format(0)
     if(current < 10){
       current = '0:0'+current
     }else{

       current = '0:'+current
     }
     let duration = this.prevAdminVideo.duration()
     duration = numeral(duration).format(0)

     if(duration < 10){
       duration = '0:0'+duration
     }else{
       duration = '0:'+duration
     }
     this.currentVideoDuration = current+' / '+duration
   })
   this.isPlayin = true
   this.isPaused  = false
  }

}
