import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import * as numeral from 'numeral'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';


declare var videojs : any ;


@Component({
  selector: 'app-pronosticoadmin',
  templateUrl: './pronosticoadmin.component.html',
  styleUrls: ['./pronosticoadmin.component.scss'],
})
export class PronosticoadminComponent implements OnInit {

  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  
  public url:string;

  public hipodromos : any;
  public paises : any;
  public hipodroName : string;
  public pais:string;
  public type:string;
  public descripcion : string;
  public userAny :any;
  public FullMonth : string;
  public LongDate : string;
  public preview : boolean;



  //vainas del preview

  @ViewChild('hipDate', { static: false}) HIdate: IonSlides;

  prevVideo :any
  public isPlayin:boolean;
  public isPaused : boolean;
  public currentVideoDuration : string;
  public blur : string;
  public FechaDate : string;
  public montNum : string;
  public programarPost : boolean;
  public noticiUrg : boolean;
  public PostonNextMonth : boolean;
  public nextMonth : string;
  public fechaHoy : number;
  public dayToday : string;
  public horaProgra : string;
  public dayPostProg : string;
  public nesxtMontNum : string;

  hipoDate={
    initialSlide:0,
    slidesPerView:1,
    speed:800,
    autoplay:{
      delay:2000
    }
  }

  constructor(public modal : ModalController, public afAuth : AngularFireAuth ,
              public app : TriviaService, public storage : AngularFireStorage,
              public db: AngularFirestore, public sanitaizer : DomSanitizer,
              public toastController : ToastController, public loadingController : LoadingController,
              public alert : AlertController) { }

  ngOnInit() {
    
    this.preview = false
    this.programarPost = false
    this.noticiUrg = false
    this.PostonNextMonth = false

    this.app.getHipodromo().subscribe(item =>{
      this.hipodromos = item
    })

    this.app.getPaisName().subscribe(item =>{
      this.paises = item
    })

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
        })
       }
      })

      
    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();
   

      switch(n) {
        case 0:
          this.FullMonth = "Enero";
          this.montNum = '01'
          break;
        case 1:
          this.FullMonth = "Febrero";
          this.montNum = '02'
          break;
        case 2:
          this.FullMonth = "Marzo";
          this.montNum = '03'
          break;
        case 3:
          this.FullMonth = "Abril";
          this.montNum = '04'
          break;
        case 4:
          this.FullMonth = "Mayo";
          this.montNum = '05'
          break;
        case 5:
          this.FullMonth = "Junio";
          this.montNum = '06'
          break;
        case 6:
          this.FullMonth = "Julio";
          this.montNum = '07'
          break;
        case 7:
            this.FullMonth = "Agosto";
            this.montNum = '08'
            break; 
        case 8:
            this.FullMonth = "Septiembre";
            this.montNum = '09'
            break; 
            
        case 9:
            this.FullMonth = "Octubre";
            this.montNum = '10'
            break; 
        case 10:
            this.FullMonth = "Noviembre";
            this.montNum = '11'
            break; 
            
        case 11:
            this.FullMonth = "Diciembre";
            this.montNum = '12'
            break;
      }

      switch(today) {
        case 0:
          this.dayToday = "Domingo";
          break;
        case 1:
          this.dayToday = "Lunes";
          break;
        case 2:
          this.dayToday = "Martes";
          break;
        case 3:
          this.dayToday = "Miercoles";
          break;
        case 4:
          this.dayToday = "Jueves";
          break;
        case 5:
          this.dayToday = "Viernes";
          break;
        case 6:
          this.dayToday = "Sabado";
      }

      
     this.LongDate = day.toString() + ' de ' + this.FullMonth;

     this.fechaHoy = day

  }

  dismissModal(){
    this.modal.dismiss()
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

   seraPronostico(){
     if(this.type === 'Pronostico'){
       this.noticiUrg = true
     }else{
       this.noticiUrg = false
     }
   }

   sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   async previewVideo(){
     this.preview = true

   await  this.sleep(1000)

     this.prevVideo = videojs(document.getElementById('prev'))

    this.prevVideo.poster('../../../../assets/other/poster2.jpg')
    
    this.HIdate.update()


    
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.url)

    const web:string = link.changingThisBreaksApplicationSecurity

    this.prevVideo.src({
      type: 'video/mp4',
      src: web
    });

    this.prevVideo.play()
    var timer = setInterval(()=>{
      let current = this.prevVideo.currentTime()
      current = numeral(current).format(0)
      if(current < 10){
        current = '0:0'+current
      }else{

        current = '0:'+current
      }
      let duration = this.prevVideo.duration()
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

   goBack(){
     this.prevVideo.pause()
     this.preview = false
   }

  async sendRevision(){


     this.presentLoading()
     let d = new Date();
     let hour = d.getHours();
    let minutes= d.getMinutes();
    let day = d.getDate();


    let minut : string
    let hor : string;

    if(minutes < 10){
      minut = '0'+minutes
    }else{
      minut = ''+minutes
    }


    if(hour < 10){
      hor = '0'+hour
    }else{
      hor = ''+hour
    }

    if(day >= 0 && day <10){
      this.FechaDate = this.montNum + '0'+day
    }else{
      this.FechaDate = this.montNum+day
    }



    
    let hourFilter = hor+':'+minut

    if(this.noticiUrg === true){
      this.db.collection('pronostico').add({
        hipodromo:this.hipodroName,
        pais:this.pais,
        type:this.type,
        descripcion:this.descripcion,
        videoUrl:this.url,
        originalVideo:this.url,
        videoOptimizado:'no tiene',
        talentName:this.userAny.displayName,
        date:this.LongDate,
        talentPhoto:this.userAny.photoURL,
        aproved:'aprobado',
        hour:hourFilter,
        fecha:this.FechaDate,
        urgente:true
      }).then(()=>{
       this.successToast()
       this.modal.dismiss()
      })
    }

    if(this.noticiUrg === false && this.programarPost === false){
      this.db.collection('pronostico').add({
        hipodromo:this.hipodroName,
        pais:this.pais,
        type:this.type,
        descripcion:this.descripcion,
        videoUrl:this.url,
        originalVideo:this.url,
        videoOptimizado:'no tiene',
        talentName:this.userAny.displayName,
        date:this.LongDate,
        talentPhoto:this.userAny.photoURL,
        aproved:'pendiente' ,
        hour:hourFilter,
        fecha:this.FechaDate,
        urgente:false,
        programarPost : false
      }).then(()=>{
       this.successToast()
       this.modal.dismiss()
      })
    }


    if(this.noticiUrg === false && this.programarPost === true){
      let postDatee : string

      let fechaonPost : string
      if(this.PostonNextMonth === true){
         postDatee = this.dayPostProg + ' de ' + this.nextMonth

         fechaonPost = this.nesxtMontNum+this.dayPostProg
      }else{
        postDatee = this.dayPostProg + ' de ' + this.FullMonth
        if( numeral(this.dayPostProg).value() >= 0 && numeral(this.dayPostProg).value() <10){
          fechaonPost = this.montNum + '0'+this.dayPostProg
        }else{
          fechaonPost = this.montNum+this.dayPostProg
        }
      }
      

      this.db.collection('pronostico').add({
        hipodromo:this.hipodroName,
        pais:this.pais,
        type:this.type,
        descripcion:this.descripcion,
        videoUrl:this.url,
        originalVideo:this.url,
        videoOptimizado:'no tiene',
        talentName:this.userAny.displayName,
        date:postDatee,
        talentPhoto:this.userAny.photoURL,
        aproved:'pendiente' ,
        hour:this.horaProgra,
        fecha:fechaonPost,
        urgente:false,
        programarPost:true
      }).then(()=>{
       this.successToast()
       this.modal.dismiss()
      })
    }

    






   }

   isNoticiaUrg(e){
    if(e.detail.checked === true  ){
      this.noticiaUrgenteAlert()
    }else{
      
    }

    if(this.type === 'Pronostico'){
      this.noticiUrg = true
    }
   }

   isProgramarActive(){
     if(this.FullMonth === 'Enero'){
       this.nextMonth = 'Febrero'
       this.nesxtMontNum = '02'
     }

     if(this.FullMonth === 'Febrero'){
      this.nextMonth = 'Marzo'
      this.nesxtMontNum = '03'
    }

    if(this.FullMonth === 'Marzo'){
      this.nextMonth = 'Abril'
      this.nesxtMontNum = '04'
    }

    if(this.FullMonth === 'Abril'){
      this.nextMonth = 'Mayo'
      this.nesxtMontNum = '05'
    }

    if(this.FullMonth === 'Mayo'){
      this.nextMonth = 'Junio'
      this.nesxtMontNum = '06'
    }

    if(this.FullMonth === 'Junio'){
      this.nextMonth = 'Julio'
      this.nesxtMontNum = '07'
    }

    if(this.FullMonth === 'Julio'){
      this.nextMonth = 'Agosto'
      this.nesxtMontNum = '08'
    }

    if(this.FullMonth === 'Agosto'){
      this.nextMonth = 'Septiembre'
      this.nesxtMontNum = '09'
    }

    if(this.FullMonth === 'Septiembre'){
      this.nextMonth = 'Octubre'
      this.nesxtMontNum = '10'
    }

    if(this.FullMonth === 'Octubre'){
      this.nextMonth = 'Noviembre'
      this.nesxtMontNum = '11'
    }

    if(this.FullMonth === 'Noviembre'){
      this.nextMonth = 'Diciembre'
      this.nesxtMontNum = '12'
    }

    if(this.FullMonth === 'Diciembre'){
      this.nextMonth = 'Enero'
      this.nesxtMontNum = '01'
    }

    this.noticiUrg = false




   }


   async noticiaUrgenteAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Espera un momento',
      message: 'Si publicas este video de inmediato el equipo de moderacion de GRTV lo puede bajar en cualquier momento en caso de que no cumpla con las normas de publicacion.',
      buttons: ['OK']
    });

    await alert.present();

  }

   async successToast(){
    const toast = await this.toastController.create({
      message: 'Has enviado tu '+ this.type+ ' correctamente.' ,
      duration: 3000
    });
    toast.present();
  
   }

   async presentLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espera a que se envie tu '+this.type,
      duration: 1000,
      spinner:'crescent'
    });
    await loading.present();
  }

}
