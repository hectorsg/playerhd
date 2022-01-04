import { DomSanitizer } from '@angular/platform-browser';
import { AccService } from './../../servicios/acc.service';
import { AuthService } from './../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, IonSlides, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import sortBy from 'sort-by';
import * as numeral from 'numeral'

declare var videojs : any ;


@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss'],
})
export class AccComponent implements OnInit {

  public gustavoDato:string;
  public datoSpan:string;
  public sliderLoad:string;

  //Aqui va los reproductores de video
  
  accPronVideo :any
  accCarreraVideo : any;
  howToVideoPlayer : any;


  //posibles para apùestale con cariño
  //Boton de comenzar partida
  public comenzarPartida : boolean;
  public month:string;
  public dateFalta:number = 11;
  public JugadaIdNew:string;
  public gameStart:boolean;
  public dateFaltaGame:number = 31; // aqui tiene que ir 181
  public apuestaConfirmada:boolean;
  public apuestaADD:boolean;
  public raceRun : boolean;
  public results:boolean;
  public apuestaActive:string;
  public posicionesActive:string;
  public resultadosActive:string;
  public mustLogin:string;
  public entrarSalaP:boolean;
  //Variables para crear partida
  public participantesMax : string;
  public pais:string;
  public isPublic:boolean;
  public myUser:any;
  public playersArray:any;
  public salaInfo:any;
  public isChecked:boolean;

  //Variables para ingresar a la partida
  public inputEntrarSala:string;
  public out : boolean
  //variable a la hora de apostar
  public apuestaList:any;
  public betIsDone:string;
  public videosDisponibles:any;
  public carreraSala:any;
  public confirmCaballosJugada:string;
  public UnselectedHorse:string;
  public ConfirmedHorseJugadores:any;
  public HowManyPlayers:any;
  public MiSeleccionArray:any;
  public ApuestasArraySala:any;
  public confirmRestartGame:string;
  public howManyRestartSala:any;
  public carreraVistaPlayers:any;
  public salaAllArray:any;
  public salasDisponibles:any;
  public thereIsActiveSalas:any;
  public puntosAcumulados:number;
  public myJugad : any;
  public UserGame:any;

  public frasesBienvenido : any;
  public fotoPerfilAcc : any;

  public howToVideos : any;
  public howToData : any;

  constructor(public modal : ModalController, public toastController: ToastController,
              public db : AngularFirestore, public auth:AuthService, public afAuth : AngularFireAuth,
                public appSer : AccService, public sanitaizer : DomSanitizer, public alert : AlertController) { }

  @ViewChild('acc', { static: false}) accSlide: IonSlides;
  @ViewChild('listslider', {static:false}) sliderList:IonSlides;

  accslider = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400,
    direction:'vertical'
  }

  ngOnInit() {
    this.appSer.frasesBienvenido().subscribe(item => {

      let fraarr : any = item
      this.frasesBienvenido =fraarr[Math.floor((Math.random()*fraarr.length))]

    })

    this.appSer.fotosBienvenidoPerfil().subscribe(item =>{
      

      let fraa : any = item
      this.fotoPerfilAcc =fraa[Math.floor((Math.random()*fraa.length))]
    })


    this.appSer.howTo().subscribe(item => { 
      this.howToVideos = item

    })

   
   
  }

  ionViewDidEnter(){
    this.isPublic= false
    this.accSlide.update().then(item =>{
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.sliderLoad = 'opacity:1';
          this.showDato();
          this.appSer.myPlays(user.uid).subscribe(item => {
            this.myJugad = item
            
            if(this.myJugad.length ===0){
              this.myJugad = null
            }

            console.log(this.myJugad)



      
          })
          this.appSer.salaALL().subscribe(item =>{
            this.salaAllArray = item
            this.salasDisponibles = this.salaAllArray.filter(item => item.isPublicRoom === true && item.partidaDisponible === true );
          })
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.myUser = item;
            
          })
         }else{
           this.mustLogin = 'opacity:1';
         }
        }
    ) })
    
    this.accSlide.lockSwipes(true);

    let d = new Date();
    let n = d.getMonth();

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

  }

  misSalas(){
    this.accSlide.lockSwipes(false)
     this.accSlide.slideTo(5)
     this.accSlide.lockSwipes(true)
  }

  async showDato(){
    this.sleep(3500);
    this.gustavoDato = 'bottom:0;display:flex;'
    this.datoSpan='bottom: 10%;display:flex;'
   
  }

  goToGameLobby(item){
    this.salaInfo = item

    this.appSer.jugadoresSalas(this.salaInfo.uid).subscribe(item=>{
      this.playersArray = item
    })

    if(this.salaInfo.gameStarted === true){
      this.db.collection('videosacc').doc(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
        this.carreraSala = item
      })
    
     
      this.appSer.apuestasArray().subscribe(item=>{
        this.apuestaList = item;
      })
      this.dateFalta=null
      this.comenzarPartida = false
      this.gameStart = true
      this.CountDownGame();
    }
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(4)
    this.accSlide.lockSwipes(true)
  }
 

  dismissModal(){

    if(this.myJugad){

      if(this.myJugad.length >0){
        for(let item of this.myJugad){
          this.db.collection('apuestalesalas').doc(item.id).delete()
        }
      }
     
    }
   
    this.modal.dismiss()
  }

 
  async juegoRapido(){
     this.accSlide.lockSwipes(false)
     this.accSlide.slideTo(0)
     this.accSlide.lockSwipes(true)

     if(this.salasDisponibles.length > 0){
      await  this.sleep(2000);
      this.thereIsActiveSalas = true
     }
 
   }
  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   crearSala(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(2)
    let idF =Math.random().toString(36).substring(2);
    let idS =Math.random().toString(36).substring(2);
    this.JugadaIdNew = idF+idS
    this.accSlide.lockSwipes(true)
    this.thereIsActiveSalas = null
   }
   howTo(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(3)
    this.accSlide.lockSwipes(true)
    this.thereIsActiveSalas = null
   }
   backtoStart(){
    this.accSlide.lockSwipes(false)
    this.accSlide.slideTo(1)
    this.accSlide.lockSwipes(true)

    this.howToData = null

    
   }

 async  abrirHowTo(item){

     this.howToData = item
     await this.sleep(100)
 
     this.howToVideoPlayer = videojs(document.getElementById('howToVideoPlay'));
     
     this.howToVideoPlayer.poster('../../../../assets/other/poster1.jpg')
 
     let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(item.video)
              
     const web:string = link.changingThisBreaksApplicationSecurity
 
  

     this.howToVideoPlayer.src({
      type: 'video/mp4',
      src: web
    });
 
    
 
     
     this.howToVideoPlayer.play();
     

   }

   async abrirVideo(){

    
 
 
      
 
 
   //  this.triggerClick()
    
   }

   async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Espera un momento',
      message: 'Deseas salir de esta partida?.',
      buttons: [{
        text: 'Seguir Jugando',
        handler: (blah) => {

        }
      },{
        text: 'Salir',
        handler: (blah) => {
          this.invitedWantGetOut()
        }
      },]
    });

    await alert.present();
  }

 async  invitedWantGetOut(){

    this.out = true

    if(this.MiSeleccionArray){
      for(let item of this.MiSeleccionArray ){

        this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).delete()
  
      }
    }



    this.gameStart = null
    this.apuestaADD = null
    this.raceRun =null
    this.results = null
    //aqui termina para volver al principio 

    //Aqui se reinician las cosas para que funcione todo desde cero de nuevo
    this.apuestaConfirmada=null
    this.confirmCaballosJugada = null
    this.UnselectedHorse = null
    this.betIsDone = null
    this.dateFaltaGame = 31
    this.dateFalta = 11
    this.apuestaList = null

    if(this.ApuestasArraySala){
      let misApuestasPorBorrar = this.ApuestasArraySala.filter(item => item.playerName === this.myUser.displayName)
      for(let item of misApuestasPorBorrar){
        this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id).delete()
      }
    }


    await this.sleep(1500)
 
   
     this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).delete()

     this.backtoStart()
   }
   async goToSala(){
    this.accSlide.lockSwipes(false)
    this.thereIsActiveSalas = null
  
    
    this.accSlide.slideTo(4)
    this.accSlide.lockSwipes(true)
   
   }

   getLink(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.carreraSala.comentario)
   }

   getLinkRace(){
    return  this.sanitaizer.bypassSecurityTrustResourceUrl( 'https://cdn.plrjs.com/player/k1z87syf24hf3/7umamto8i3eg.html?file='+this.carreraSala.carrera)
   }


   CountDown(){

   // this.dateFalta=null
   // this.comenzarPartida = false
   // this.gameStart = true
    //clearInterval(interval);
   // this.CountDownGame();


   this.db.collection('videosacc').doc(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
    this.carreraSala = item
  })

  if(this.myUser.uid === this.salaInfo.adminId){
   
    console.log('comenzando la partida')
    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).update({
      gameStarted:true
    }).then(o=>{
      console.log('partida Comenzada')
    })
  }

 
  this.appSer.apuestasArray().subscribe(item=>{
    this.apuestaList = item;
  })

   var timer = setInterval(()=>{
     this.dateFalta -= 1
    console.log('contando cada segundo ', this.dateFalta )
    this.comenzarPartida = true
    if(this.dateFalta === 0){
      console.log('intervalo clear')
      this.dateFalta=null
      this.comenzarPartida = false
      this.gameStart = true
      clearInterval(timer)
      this.CountDownGame();
    }

    if(this.out === true){
      clearInterval(timer)
    }
   },1000)
  
   
  }

  cancelarEmergencia(){
    
  }


async  CountDownGame(){

    this.comenzarPartida = true

    this.appSer.horseSelectedUsers(this.salaInfo.uid).subscribe(item =>{
      this.ConfirmedHorseJugadores = item
    })

    this.appSer.knowHowManyPlayers(this.salaInfo.uid).subscribe(item =>{
      this.HowManyPlayers = item
      console.log( 'Cuantos jugadores estan: ', this.HowManyPlayers.length)
    })


console.log('comenzando countdownGame')

    var gameTimer = setInterval(()=>{

      this.dateFaltaGame -= 1

      if(this.dateFaltaGame === 0){
        clearInterval(gameTimer)

        this.dateFaltaGame=null
        this.comenzarPartida = null
        this.apuestaADD = true
      /*  
       */
        this.verComentario()
        console.log('se acabo el tiempo para apostar')
      }

      if(this.out === true){
        clearInterval(gameTimer)
      }

    }, 1000)


  
  }

  async verConfirmedHorseJugadores(){
    await this.sleep(1000)
  
  }

  async verHowManyPlay(){
    await this.sleep(1000)
    
  }

 async verComentario(){
 /* await  this.sleep(1000)
    this.accPronVideo = videojs(document.getElementById('accProno'))

    this.accPronVideo.poster('../../../../assets/other/poster1.jpg')
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.carreraSala.comentario)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.accPronVideo.src({
      type: 'video/youtube',
      src: web
    });

    this.accPronVideo.play()*/

  }

  copyToClipBoard(){
    navigator.clipboard.writeText(this.JugadaIdNew).then(item=>{
      this.codigoCopiado()
    }).catch(e => console.error(e));
  }
  async codigoCopiado(){
    const toast = await this.toastController.create({
      message: 'El codigo fue copiado al portapapeles.',
      duration: 2000,
      position:'bottom',
      color:'success'
    });
    toast.present();
  }
  async NoExistenCarrreras(){
    const toast = await this.toastController.create({
      message: 'Lo sentimos. En este momento no disponemos de suficientes carreras para este pais',
      duration: 4000,
      position:'bottom',
      color:'danger'
    });
    toast.present();
  }

  apuestaConfirmadas(){
    this.apuestaConfirmada = true

   this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      betConfirmed:true
    }).then(item=>{
     this.betIsDone= 'pointer-events:none;opacity:0.6;'
    })
  }
  dismissApuesta(){
    this.apuestaConfirmada = null
    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      betConfirmed:false
    }).then(item=>{
      this.betIsDone= null
     })
  }

 async resultsDados(){


  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
    carreraVista:true
  }).then(i =>{
    this.confirmCaballosJugada = 'background: #078807;color: white;'
    
    
    var timer = setInterval(() => {
      if(this.carreraVistaPlayers.length === this.HowManyPlayers.length){
        this.raceRun = true
        this.appSer.salaApuestas(this.salaInfo.uid).subscribe(item =>{
          this.ApuestasArraySala = item
        })
        this.appSer.howManyRestart(this.salaInfo.uid).subscribe(item =>{
          this.howManyRestartSala = item;
        })
         this.results = true
         this.apuestaActive= 'background: #464646;color: white;'
         this.resultadosActive=null
         this.posicionesActive=null
         this.sleep(300)
         
         this.sliderList.update();

         this.HowManyPlayers = this.HowManyPlayers.sort(sortBy('-puntos'))
        clearInterval(timer)
      }
  }, 2000);
  
  })

  }
  async verPuntaje(){
    let userID = this.myUser.uid 
    
    let contador = 0
    let stop = 
    this.puntosAcumulados = 0

    this.carreraSala.results.some((x)=>{

      if(this.MiSeleccionArray[0]){
        if(x.name === this.MiSeleccionArray[0].name){
          console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
          console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
        /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
          })*/
  
        }
      }
      if(this.MiSeleccionArray[1]){
        if(x.name === this.MiSeleccionArray[1].name){
          console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
          console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
         /* this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
          })*/
        }
      }

   if(this.MiSeleccionArray[2]){
    if(x.name === this.MiSeleccionArray[2].name){
      console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
      console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
    /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
      })*/
    }
   }
   if(this.MiSeleccionArray[3]){
    if(x.name === this.MiSeleccionArray[3].name){
      console.log('Estas sumando '+ x.puntos+' puntos con '+x.name)
      console.log('llevas ', this.puntosAcumulados= numeral(this.puntosAcumulados).add(x.puntos).value())
    /*  this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
      })*/
    }
   }
     
     

      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        puntos:this.puntosAcumulados
      })
      
     
    /*  if(MiSeleccionArray[contador]){
        if(x.name === MiSeleccionArray[contador].name){
         
          console.log(this.UserGame.puntos)
          this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
            puntos:numeral(this.UserGame.puntos).add(x.puntos).value()
  
          }).then(i=>{
            console.log('registro '+ x.puntos)
          })
        


        }
       
      }*/


    })
/*
    do{
        
      
        
      
      
    
     
    this.sleep(2500)
    contador ++
    
    
  }
    while(contador <= this.carreraSala.results.length);
   
*/
  
    
  }
  apustaAct(){
    this.apuestaActive= 'background: #464646;color: white;'
    this.resultadosActive=null
    this.posicionesActive=null
    this.sliderList.slideTo(0)
  }
  resultaActive(){
    this.apuestaActive= null
    this.resultadosActive='background: #464646;color: white;'
    this.posicionesActive=null
    this.sliderList.slideTo(2)
  }
  posicionActive(){
    this.apuestaActive= null
    this.resultadosActive=null
    this.posicionesActive='background: #464646;color: white;'
    this.sliderList.slideTo(1)
  }

  

  //Funciones de escritura
  async creandoSala(){

    try{
      const videoArray = await  this.appSer.videosAcc(this.pais).subscribe(item =>{
                                       this.videosDisponibles = item;
                                       let variab = this.videosDisponibles [Math.floor(Math.random() * this.videosDisponibles.length)]
                                        
                                       if(this.videosDisponibles && variab){
                                         
                                        this.db.collection('apuestalesalas').doc(this.JugadaIdNew).set({
                                          maxPlayer:this.participantesMax,
                                          paisToplay:this.pais,
                                          isPublicRoom:this.isPublic,
                                          partidaDisponible:this.isPublic,
                                          uid:this.JugadaIdNew,
                                          salaName: this.myUser.displayName,
                                          adminId:this.myUser.uid,
                                          nroPartidas:1,
                                          photoURL:this.myUser.photoURL,
                                          carreraRandom:variab.id,
                                          gameStarted:false
                                        }).then(item=>{
                                          this.db.collection('apuestalesalas').doc(this.JugadaIdNew).collection('jugadores').doc(this.myUser.uid).set({
                                            displayName:this.myUser.displayName,
                                            email:this.myUser.email,
                                            uid:this.myUser.uid,
                                            photoURL:this.myUser.photoURL,
                                            spot:1,
                                            puntos:'0',
                                            betConfirmed:false,
                                            horseSelected:false,
                                            restartGame:false,
                                            carreraVista:false,
                                            isAdmin:'true'
                                          })
                                          this.appSer.jugadoresSalas(this.JugadaIdNew).subscribe(item=>{
                                            this.playersArray = item

                                            console.log(this.playersArray)
                                          })
                                          this.db.collection('apuestalesalas').doc(this.JugadaIdNew).valueChanges().subscribe(item =>{
                                            this.salaInfo = item

                                            console.log(this.salaInfo)
                                           
                                          })
                                          
                                          this.goToSala();
                                    
                                        })
                                       }else{
                                        this.NoExistenCarrreras()
                                       }
                                      })
         if(videoArray){
           
         }                             
    }catch{

    }
   /*
   */
  }

  entrarASalaPrivada(){
    this.entrarSalaP = true
  }

 async entrarSalaRapida(itemD){

  this.out = false

  this.db.collection('apuestalesalas').doc(itemD.uid).valueChanges().subscribe(item =>{
    this.salaInfo = item

    console.log(this.salaInfo)
   
  })
    this.appSer.jugadoresSalas(itemD.id).subscribe(item=>{
      this.playersArray = item

      console.log('Aqui estas entrando a ver playersArray')
      console.log(this.playersArray)
      console.log('   ')
     
    })


    await this.sleep(1000)
    if(this.playersArray.length +1 < itemD.maxPlayer){

      console.log('aqui entras a registrar a tu usuario')
      this.db.collection('apuestalesalas').doc(itemD.uid).collection('jugadores').doc(this.myUser.uid).set({
        displayName:this.myUser.displayName,
        email:this.myUser.email,
        uid:this.myUser.uid,
        photoURL:this.myUser.photoURL,
        spot:this.playersArray.length + 1,
        betConfirmed:false,
        horseSelected:false,
        restartGame:false,
        puntos:'0',
        isAdmin:'false',
        carreraVista:false
      }).then(i =>{

        console.log('aqui ya registraste la sala')
        this.goToSala();
   
        

      })
    }else{
      this.SalaLlena(itemD)
    }
    
    await this.sleep(1500)
    
    this.startGAME()
  }

  async SalaLlena(item){
    const toast = await this.toastController.create({
      message: 'La sala de '+item.salaName+' alcanzo su limite de '+item.maxPlayer+' jugadores.',
      duration: 2000,
      position:'bottom',
      color:'warning'
    });
    toast.present();
  }

 async enviarCodigoEntrar(){
    // aqui va lo mismo pero con el input
    this.out = false

    this.db.collection('apuestalesalas').doc(this.inputEntrarSala).valueChanges().subscribe(item =>{
      this.salaInfo = item
  
      console.log(this.salaInfo)
     
    })
      this.appSer.jugadoresSalas(this.inputEntrarSala).subscribe(item=>{
        this.playersArray = item
  
        console.log('Aqui estas entrando a ver playersArray')
        console.log(this.playersArray)
        console.log('   ')
       
      })
  
  
      await this.sleep(1000)
      if(this.playersArray.length +1 < this.salaInfo.maxPlayer){
  
        console.log('aqui entras a registrar a tu usuario')
        this.db.collection('apuestalesalas').doc(this.inputEntrarSala).collection('jugadores').doc(this.myUser.uid).set({
          displayName:this.myUser.displayName,
          email:this.myUser.email,
          uid:this.myUser.uid,
          photoURL:this.myUser.photoURL,
          spot:this.playersArray.length + 1,
          betConfirmed:false,
          horseSelected:false,
          restartGame:false,
          puntos:'0',
          isAdmin:'false',
          carreraVista:false
        }).then(i =>{
  
          console.log('aqui ya registraste la sala')
          this.goToSala();
     
          
  
        })
      }else{
        this.SalaLlena(this.salaInfo)
      }
      
      await this.sleep(1500)
      
      this.startGAME()
  }

  onAddApuesta(item){
    
   if(item.isCheck === true){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id+this.myUser.displayName).set({
        name:item.name,
        playerName:this.myUser.displayName,
        userPhotoURL:this.myUser.photoURL
      })
    }else{
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id+this.myUser.displayName).delete();
    }
    
  }
  addRacersBet(item){
    if(item.isCheck === true){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).set({
        name:item.name
      })
    }else{
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).delete()
    }


  }

 async startGAME(){
   let i : number = 1
  var invitedGamer = setInterval(()=>{
    if(this.out === true){
      clearInterval(invitedGamer)
    }
    i++
    console.log('Revisando si comenzo ', i, ' Comenzo?', this.salaInfo.gameStarted)

    if(this.salaInfo.gameStarted === true){
      clearInterval(invitedGamer)
      this.CountDown()
    }

   
  },1000)

  }
  onDidDismiss(){
    if(this.salaInfo.adminId === this.myUser.uid){
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).delete()
    }
  }

  confirmHorseSelection(){

 //   this.accPronVideo.pause()
    

    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      horseSelected:true
    }).then(item =>{

      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
        this.MiSeleccionArray = item
        this.verPuntaje()
      })

      this.appSer.howManyViewRace(this.salaInfo.uid).subscribe(item =>{
        this.carreraVistaPlayers = item
      })
      this.confirmCaballosJugada = 'background: #078807;color: white;'
      this.UnselectedHorse = 'pointer-events:none;opacity:0.6;'

     var timer = setInterval(() => {
       console.log('estas chequeando por el horseSelected..')
        if(this.ConfirmedHorseJugadores.length === this.HowManyPlayers.length){
          this.raceRun = true
          this.appSer.salaApuestas(this.salaInfo.uid).subscribe(item =>{
            this.ApuestasArraySala = item
          })
          this.confirmCaballosJugada = null
          clearInterval(timer)
          this.verCarreraV()
        }
    }, 2000);
      
    })
    
  }

 async verCarreraV(){
 /*   await  this.sleep(1000)
    this.accCarreraVideo = videojs(document.getElementById('accCarrera'))

    this.accCarreraVideo.poster('../../../../assets/other/poster1.jpg')
    
   


    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.carreraSala.carrera)

    const web:string = link.changingThisBreaksApplicationSecurity
    

    this.accCarreraVideo.src({
      type: 'video/youtube',
      src: web
    });

    this.accCarreraVideo.play()*/
  }

  getlistOrdered(){
    return this.HowManyPlayers.sort(sortBy('-puntos'));
    
  }

  restartSala(){
 


    this.confirmRestartGame = 'background: #078807;color: white;'

    this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
      restartGame:true
    }).then(item =>{
     var timer = setInterval(() => {
        if(this.howManyRestartSala.length === this.HowManyPlayers.length){

            this.updateRace();

          clearInterval(timer)
        }
    }, 2000);
      
    })
  }

  async updateRace(){
    this.appSer.videosAcc(this.salaInfo.paisToplay).subscribe(item =>{
      this.videosDisponibles = item;
      let variab = this.videosDisponibles [Math.floor(Math.random() * this.videosDisponibles.length)]
      for(let item of this.MiSeleccionArray ){

        this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).collection(this.salaInfo.carreraRandom).doc(item.name).delete()

      }
      this.carreraSala = null
      if(this.videosDisponibles && variab && this.salaInfo.adminId === this.myUser.uid){
        
       this.db.collection('apuestalesalas').doc(this.salaInfo.uid).update({
         carreraRandom:variab.id
       })
      }
      
      this.db.collection('videosacc').doc(this.salaInfo.carreraRandom).valueChanges().subscribe(item =>{
        this.carreraSala = item
      })
      this.gameStart = true
      this.apuestaADD = null
      this.raceRun =null
      this.results = null
      //aqui termina para volver al principio 

      //Aqui se reinician las cosas para que funcione todo desde cero de nuevo
      this.apuestaConfirmada=null
      this.confirmCaballosJugada = null
      this.UnselectedHorse = null
      this.betIsDone = null
      this.dateFaltaGame = 31
      console.log(this.MiSeleccionArray)
      console.log('Arriba esta mi seleccion de caballos y abajo esta las apuestas de la partida')
      this.apuestaList = null

      this.appSer.apuestasArray().subscribe(item=>{
        this.apuestaList = item;
      })
   
      let misApuestasPorBorrar = this.ApuestasArraySala.filter(item => item.playerName === this.myUser.displayName)
      for(let item of misApuestasPorBorrar){
        this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('apuestas').doc(item.id).delete()
      }
      this.db.collection('apuestalesalas').doc(this.salaInfo.uid).collection('jugadores').doc(this.myUser.uid).update({
        betConfirmed:false,
        carreraVista:false,
        horseSelected:false
      })
      this.CountDownGame()
      console.log('prendiendo el GameStart')
     })
  }

  salirdePartida(id){
    console.log(id)
    this.accSlide.lockSwipes(false)
this.accSlide.slideTo(1)
this.accSlide.lockSwipes(true)
 /*   this.db.collection('apuestalesalas').doc(id).collection('jugadores').doc(this.myUser.uid).delete().then(ite =>{
      this.gameStart = null
      this.apuestaADD = null
      this.raceRun = null
      this.results = null


      this.apuestaList = null
this.betIsDone= null;
this.videosDisponibles=null
this.carreraSala=null
this.confirmCaballosJugada=null;
this.UnselectedHorse=null;
this.ConfirmedHorseJugadores=null;
this.HowManyPlayers=null
this.MiSeleccionArray=null
this.ApuestasArraySala=null
this.confirmRestartGame=null
this.howManyRestartSala=null


console.log('saliste de la partida')

    })*/
  }

  
}
