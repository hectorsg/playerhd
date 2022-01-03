import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import * as numeral from 'numeral'
import { AngularFirestore } from '@angular/fire/firestore';
import sortBy from 'sort-by';
import { AngularFireStorage } from '@angular/fire/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var videojs : any ;

@Component({
  selector: 'app-pronosticosuper',
  templateUrl: './pronosticosuper.component.html',
  styleUrls: ['./pronosticosuper.component.scss'],
})
export class PronosticosuperComponent implements OnInit {

  public pronList : any;
  public preview : boolean;
  public blur : string;
  public currentVideoDuration : string;
  public isPlayin : boolean;
  public isPaused : boolean;
  public previewItem : any;
  public FullMonth : string;
  public pronosToUpdate : any;
  public optimizarOpen :string;

  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  
  public url:string;

  public urlHls : string;

  public urlHlsAndroid : string

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
  constructor(public modal : ModalController, public app : TriviaService, 
    public sanitaizer : DomSanitizer, public db : AngularFirestore, 
    public storage : AngularFireStorage, public inBro : InAppBrowser,
    public http : HttpClient, public loadingController : LoadingController,
    public toastController : ToastController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    let d = new Date();
    let n = d.getMonth()
    
    switch(n) {
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
    this.app.getPronostico().subscribe(item=>{
      this.pronList = item

      this.pronList.sort(sortBy('fecha'))
     })
  } 

  descargarVideo(){
    this.storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2F0l1vojsi5cz?alt=media&token=30f39a89-70fa-46b0-b0e8-d005d3ef9031').getDownloadURL().subscribe(item =>{
      let res : any = item
      console.log(res)


      
   let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(res)

   const web:string = link.changingThisBreaksApplicationSecurity

       // This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', res);
  xhr.send();
    })
  }

 async sendToCloudflare(item){
    //'ZGCyJpmZ76hSEBlPm9cSLJNZ_prs2HMiUL7RodzE'

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ZGCyJpmZ76hSEBlPm9cSLJNZ_prs2HMiUL7RodzE`
  });

  let nameMetadata : string = `${item.talentName}${item.id}`

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Optimizando...',
  });
  await loading.present();

 

    this.http.post('https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/copy',{"url":item.originalVideo,"meta":{"name":nameMetadata}},{
      headers: headers,
    }).subscribe(res =>{
      var statee =  setInterval(()=>{
        let resThis : any = res
       

        this.http.get(`https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/${resThis.result.uid}`,{
          headers: headers,
        }).subscribe(async rrres =>{
          let resi : any = rrres
          console.log('holaaa',resi.result)

          if(resi.status === '400'){
            console.log('tienes un problema')
          }
          if(resi.result.status.state === 'error'){
            clearInterval(statee)
            console.log('esta en error')
           this.desaprobar(item)
            this.successToast(resi.result.status.errorReasonText)
            let adu = new Audio()

              adu.src = "../../../assets/done_2.mp3";
              adu.load();
              adu.play();
            await loading.dismiss()
          }
          if(resi.result.readyToStream === true){
            console.log('Ya esta optimizado')
            clearInterval(statee)


            this.db.collection('pronostico').doc(item.id).set({
              hipodromo:item.hipodromo,
              pais:item.pais,
              type:item.type,
              descripcion:item.descripcion,
              videoUrl:item.videoUrl,
              originalVideo:item.originalVideo,
              videoOptimizado:resi.result.playback.hls,
              talentName:item.talentName,
              date:item.date,
              talentPhoto:item.talentPhoto,
              aproved:'aprobado',
              hour:item.hour,
              fecha:'2022'+item.fecha,
              urgente:false,
              programarPost : false,
              videoOptimizadoA:resi.result.playback.dash
       
       
            }).then(async ()=>{
              this.ttt()
              let adu = new Audio()

              adu.src = "../../../assets/done_2.mp3";
              adu.load();
              adu.play();
              await loading.dismiss()
            })


          }else{
            console.log('aun falta que se optimice')
            
          }
        })
        
      },3500)
    })
  }

  async successToast(reason){
    const toast = await this.toastController.create({
      message: reason ,
      duration: 3000,
      color:'danger'
    });
    toast.present();
  
   }

   async ttt(){
    const toast = await this.toastController.create({
      message: 'El Video se a Optimizado',
      duration: 3000,
      color:'success'
    });
    toast.present();

   
  
   }

  goToLink(url: any){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(url.originalVideo)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')

    this.openOptimizar(url)
}

  cerrarModal(){
    this.modal.dismiss()
  }

  closeUpdateVideo(){
    this.optimizarOpen = 'bottom:-42%'
    this.url = null
    this.urlImage = null
    this.uploadPercent = null
    this.urlHls = null
    this.urlHlsAndroid = null
  }

  goBack(){
    this.preview = false
    this.previewItem = null
    this.prevAdminVideo.pause()
  }

  openOptimizar(item){
    this.optimizarOpen = 'bottom:0;'

    this.pronosToUpdate = item
  }

  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `pronosticos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   onOptimizarVideo(){
     this.db.collection('pronostico').doc(this.pronosToUpdate.id).set({
       hipodromo:this.pronosToUpdate.hipodromo,
       pais:this.pronosToUpdate.pais,
       type:this.pronosToUpdate.type,
       descripcion:this.pronosToUpdate.descripcion,
       videoUrl:this.pronosToUpdate.videoUrl,
       originalVideo:this.pronosToUpdate.originalVideo,
       videoOptimizado:this.urlHls,
       talentName:this.pronosToUpdate.talentName,
       date:this.pronosToUpdate.date,
       talentPhoto:this.pronosToUpdate.talentPhoto,
       aproved:'aprobado',
       hour:this.pronosToUpdate.hour,
       fecha:this.pronosToUpdate.fecha,
       urgente:false,
       programarPost : false,
       videoOptimizadoA:this.urlHlsAndroid


     })
   }

   aprobar(item){
    this.db.collection('pronostico').doc(item.id).update({
      aproved:'aprobado',
      urgente:false
    })
   }

   desaprobar(item){
     this.db.collection('pronostico').doc(item.id).update({
       aproved:'desaprobado'
     })
   }

   pendiente(item){
     this.db.collection('pronostico').doc(item.id).update({
       aproved:'pendiente'
     })
   }

   downloadFile(){
    let link = document.createElement("a");
    link.download = "filename.mp4";
    link.href = "https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2F5ya7z2r557o?alt=media&token=7e422777-a418-4b73-9c4d-24ea528851df";
    link.click();
}

  
  async previewVideo(item){
    this.preview = true
    this.previewItem = item

    console.log(this.previewItem)
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
