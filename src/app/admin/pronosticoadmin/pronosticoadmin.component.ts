import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import * as numeral from 'numeral'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import sortBy from 'sort-by';
declare var videojs : any ;


@Component({ 
  selector: 'app-pronosticoadmin',
  templateUrl: './pronosticoadmin.component.html',
  styleUrls: ['./pronosticoadmin.component.scss'],
})
export class PronosticoadminComponent implements OnInit {


  
  @ViewChild('cont', { static: false}) piic: IonSlides;

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
  public raceSelect : string = ' '

  //aqui van los picks

  public race1 : any;
  public carrera1 :any;

  public race2 : any;
  public carrera2 :any;

  public race3 : any;
  public carrera3 :any;

  public race4 : any;
  public carrera4 :any;

  public race5 : any;
  public carrera5 :any;

  public race6 : any;
  public carrera6 :any;

  public race7 : any;
  public carrera7 :any;

  public race8 : any;
  public carrera8 :any;

  public race9 : any;
  public carrera9 :any;

  public race10 : any;
  public carrera10 :any;

  public race11 : any;
  public carrera11 :any;

  public race12 : any;
  public carrera12 :any;

  public race13 : any;
  public carrera13 :any;

  public race14 : any;
  public carrera14 :any;

  public race15 : any;
  public carrera15 :any;

  public race16 : any;
  public carrera16 :any;

  public race17 : any;
  public carrera17 :any;

  public race18 : any;
  public carrera18 :any;

  public race19 : any;
  public carrera19 :any;

  public race20 : any;
  public carrera20 :any;

  public race21 : any;
  public carrera21 :any;
  public isPick : boolean;

  public myPick : any = [];

  public linkks : SafeResourceUrl;

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
              public alert : AlertController, private http: HttpClient) { }

  ngOnInit() {
    
    this.preview = false
    this.programarPost = false
    this.noticiUrg = false
    this.PostonNextMonth = false

    this.app.getHipodromo().subscribe(item =>{
      this.hipodromos = item
    })

    this.db.collection('talentoPanel').doc('config').valueChanges().subscribe(item =>{
      let whatsInside : any = item
      console.log(whatsInside)

     this.linkks = this.sanitaizer.bypassSecurityTrustResourceUrl(whatsInside.link)
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

  ionViewDidEnter(){
   /* this.piic.update()

    this.piic.lockSwipes(true)*/
  }

  dismissModal(){
    this.modal.dismiss()
  }


  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
    const ida =Math.random().toString(36).substring(2);
    const idas = Math.random().toString(36).substring(2);
 
    const id = ida+idas
    const file = e.target.files[0];
    const filePath = `pronosticos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }


   seraPronostico(){
    
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

   carrera1Change(){
    
        

     this.race1 = this.race1.sort(sortBy('number'))

     console.log( this.race1)
    this.carrera1 = {raceName:'R1', pick : this.race1 }
    
    
    }

    carrera2Change(){
    
        

      this.race2 = this.race2.sort(sortBy('number'))
 
      console.log( this.race2)
     this.carrera2 = {raceName:'R2', pick : this.race2 }
     
     
     }

     carrera3Change(){
    
        

      this.race3 = this.race3.sort(sortBy('number'))
 
      console.log( this.race3)
     this.carrera3 = {raceName:'R3', pick : this.race3 }
     
     
     }

     carrera4Change(){
    
        

      this.race4 = this.race4.sort(sortBy('number'))
 
      console.log( this.race4)
     this.carrera4 = {raceName:'R4', pick : this.race4 }
     
     
     }

     carrera5Change(){
    
        

      this.race5 = this.race5.sort(sortBy('number'))
 
      console.log( this.race5)
     this.carrera5 = {raceName:'R5', pick : this.race5 }
     
     
     }

     carrera6Change(){
      this.race6 = this.race6.sort(sortBy('number'))
 
      console.log( this.race6)
     this.carrera6 = {raceName:'R6', pick : this.race6 }
     }

     carrera7Change(){
      this.race7 = this.race7.sort(sortBy('number'))
 
      console.log( this.race7)
     this.carrera7 = {raceName:'R7', pick : this.race7 }
     }

     carrera8Change(){
      this.race8 = this.race8.sort(sortBy('number'))
 
      console.log( this.race8)
     this.carrera8 = {raceName:'R8', pick : this.race8 }
     }

     carrera9Change(){
      this.race9 = this.race9.sort(sortBy('number'))
 
      console.log( this.race9)
     this.carrera9 = {raceName:'R9', pick : this.race9 }
     }

     carrera10Change(){
      this.race10 = this.race10.sort(sortBy('number'))
 
      console.log( this.race10)
     this.carrera10 = {raceName:'R10', pick : this.race10 }
     }

     carrera11Change(){
      this.race11 = this.race11.sort(sortBy('number'))
 
      console.log( this.race11)
     this.carrera11 = {raceName:'R11', pick : this.race11 }
     }

     carrera12Change(){
      this.race12 = this.race12.sort(sortBy('number'))
 
      console.log( this.race12)
     this.carrera12 = {raceName:'R12', pick : this.race12 }
     }

     carrera13Change(){
      this.race13 = this.race13.sort(sortBy('number'))
 
      console.log( this.race13)
     this.carrera13 = {raceName:'R13', pick : this.race13 }
     }

     carrera14Change(){
      this.race14 = this.race14.sort(sortBy('number'))
 
      console.log( this.race14)
     this.carrera14 = {raceName:'R14', pick : this.race14 }
     }

     carrera15Change(){
      this.race15 = this.race15.sort(sortBy('number'))
 
      console.log( this.race15)
     this.carrera15 = {raceName:'R15', pick : this.race15 }
     }

     carrera16Change(){
      this.race16 = this.race16.sort(sortBy('number'))
 
      console.log( this.race16)
     this.carrera16 = {raceName:'R16', pick : this.race16 }
     }

     carrera17Change(){
      this.race17 = this.race17.sort(sortBy('number'))
 
      console.log( this.race17)
     this.carrera17 = {raceName:'R17', pick : this.race17 }
     }

     carrera18Change(){
      this.race18 = this.race18.sort(sortBy('number'))
 
      console.log( this.race18)
     this.carrera18 = {raceName:'R18', pick : this.race18 }
     }

     carrera19Change(){
      this.race19 = this.race19.sort(sortBy('number'))
 
      console.log( this.race19)
     this.carrera19 = {raceName:'R19', pick : this.race19 }
     }

     carrera20Change(){
      this.race20 = this.race20.sort(sortBy('number'))
 
      console.log( this.race20)
     this.carrera20 = {raceName:'R20', pick : this.race20 }
     }

     carrera21Change(){
      this.race21 = this.race21.sort(sortBy('number'))
 
      console.log( this.race21)
     this.carrera21 = {raceName:'R21', pick : this.race21 }
     }

    async juntarTodos(){
      //this.myPick
      if(this.carrera1){
        this.myPick.push(this.carrera1)
      }

      if(this.carrera2){
        this.myPick.push(this.carrera2)
      }

      if(this.carrera3){
        this.myPick.push(this.carrera3)
      }

      if(this.carrera4){
        this.myPick.push(this.carrera4)
      }

      if(this.carrera5){
        this.myPick.push(this.carrera5)
      }

      if(this.carrera6){
        this.myPick.push(this.carrera6)
      }

      if(this.carrera7){
        this.myPick.push(this.carrera7)
      }

      if(this.carrera8){
        this.myPick.push(this.carrera8)
      }

      if(this.carrera9){
        this.myPick.push(this.carrera9)
      }

      if(this.carrera10){
        this.myPick.push(this.carrera10)
      }

      if(this.carrera11){
        this.myPick.push(this.carrera11)
      }

      if(this.carrera12){
        this.myPick.push(this.carrera12)
      }

      if(this.carrera13){
        this.myPick.push(this.carrera13)
      }

      if(this.carrera14){
        this.myPick.push(this.carrera14)
      }

      if(this.carrera15){
        this.myPick.push(this.carrera15)
      }

      if(this.carrera16){
        this.myPick.push(this.carrera16)
      }

      if(this.carrera17){
        this.myPick.push(this.carrera17)
      }

      if(this.carrera18){
        this.myPick.push(this.carrera18)
      }

      if(this.carrera19){
        this.myPick.push(this.carrera19)
      }

      if(this.carrera20){
        this.myPick.push(this.carrera20)
      }

      if(this.carrera21){
        this.myPick.push(this.carrera21)
      }

      console.log(this.myPick)
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
      duration: 3000,
      color:'success'
    });
    toast.present();

    
  
   }

   eliminarPrueba(){
    this.storage.storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/Comp%201_1.mp4?alt=media&token=c88bf236-8af5-4d40-bf85-10e5ee7a60ce').delete();
   }

   async sendToCloudflare(){
    //'ZGCyJpmZ76hSEBlPm9cSLJNZ_prs2HMiUL7RodzE'

    if(this.type === 'Pronostico'){
      this.juntarTodos()
    }
    let d = new Date();
    let hour = d.getHours();
   let minutes= d.getMinutes();
   let day = d.getDate();
   let year = d.getFullYear();

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
    this.FechaDate = year+this.montNum + '0'+day
  }else{
    this.FechaDate = year+this.montNum+day
  }



   
   let hourFilter = hor+':'+minut

 

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ZGCyJpmZ76hSEBlPm9cSLJNZ_prs2HMiUL7RodzE`
  });

  const idun = Math.random().toString(36).substring(2);
  const iddos = Math.random().toString(36).substring(2);
  

  const id = idun+iddos

  let nameMetadata : string = `${this.userAny.displayName}${id}`

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Optimizando Video, no cierres la app...',
  });
  await loading.present();

 

    this.http.post('https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/copy',{"url":this.url,"meta":{"name":nameMetadata}},{
      headers: headers,
    }).subscribe(res =>{
      var statee =  setInterval(()=>{
        let resThis : any = res

      
        this.http.get(`https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/${resThis.result.uid}`,{
          headers: headers,
        }).subscribe(async rrres =>{
          let resi : any = rrres
          console.log(resi.result)
          if(resi.result.status.state === 'error'){
            clearInterval(statee)
            console.log('esta en error')
            this.Toast(resi.result.status.errorReasonText)
            let adu = new Audio()

              adu.src = "../../../assets/done_2.mp3";
              adu.load();
              adu.play();
            await loading.dismiss()
            this.storage.storage.refFromURL(this.url).delete();

            await this.sleep(1000)
            this.uploadPercent = null
            this.urlImage = null
            this.url = null
          }
          if(resi.result.readyToStream === true){
            console.log('Ya esta optimizado')
            clearInterval(statee)

            if(this.type === 'Pronostico'){
              this.db.collection('pronostico').add({
                hipodromo:this.hipodroName,
                pais:this.pais,
                type:this.type,
                descripcion:this.descripcion,
                videoUrl:this.url,
                originalVideo:this.url,
                videoOptimizado:resi.result.playback.hls,
                talentName:this.userAny.displayName,
                date:this.LongDate,
                talentPhoto:this.userAny.photoURL,
                aproved:'aprobado',
                hour:hourFilter,
                fecha:this.FechaDate,
                urgente:false,
                programarPost : false,
                videoOptimizadoA:resi.result.playback.dash,
                carreraNro:this.raceSelect,
                cloudflareId:resThis.result.uid,
                wasSeen:false,
                year:year,
                picks:this.myPick,
                talentPickPhoto:this.userAny.pickPhoto
  
         
         
              }).then(async ()=>{
                
                let adu = new Audio()
  
                adu.src = "../../../assets/done_2.mp3";
                adu.load();
                adu.play();
                this.successToast()
                await loading.dismiss()
                this.storage.storage.refFromURL(this.url).delete();
                
                this.modal.dismiss()
              })
            }else{
              this.db.collection('pronostico').add({
                hipodromo:this.hipodroName,
                pais:this.pais,
                type:this.type,
                descripcion:this.descripcion,
                videoUrl:this.url,
                originalVideo:this.url,
                videoOptimizado:resi.result.playback.hls,
                talentName:this.userAny.displayName,
                date:this.LongDate,
                talentPhoto:this.userAny.photoURL,
                aproved:'aprobado',
                hour:hourFilter,
                fecha:this.FechaDate,
                urgente:false,
                programarPost : false,
                videoOptimizadoA:resi.result.playback.dash,
                carreraNro:this.raceSelect,
                cloudflareId:resThis.result.uid,
                wasSeen:false,
                year:year
  
         
         
              }).then(async ()=>{
                
                let adu = new Audio()
  
                adu.src = "../../../assets/done_2.mp3";
                adu.load();
                adu.play();
                this.successToast()
                await loading.dismiss()
                this.storage.storage.refFromURL(this.url).delete();
                
                this.modal.dismiss()
              })
            }
            


          }else{
            console.log('aun falta que se optimice')
            
          }
        })
        
      },3500)
    })
  }

  async Toast(reason){
    const toast = await this.toastController.create({
      message: reason ,
      duration: 6000,
      color:'danger'
    });
    toast.present();
  
   }

   volverDePick(){
    this.piic.lockSwipes(false)
    this.piic.slideTo(0)
    this.piic.lockSwipes(true)
   }

   agarraPick(){
     

     console.log(this.isPick)

     if(this.isPick === true){
       this.piic.lockSwipes(false)
       this.piic.slideTo(1)
       this.piic.lockSwipes(true)
     }
   }
  async ttt(){
    const toast = await this.toastController.create({
      message: 'El Video se a Optimizado',
      duration: 3000,
      color:'success'
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
