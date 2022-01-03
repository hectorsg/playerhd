import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TriviaService } from '../servicios/trivia.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import sortBy from 'sort-by';
import { IonSlides } from '@ionic/angular';
declare var videojs : any ;

@Component({
  selector: 'app-auto-principal',
  templateUrl: './auto-principal.page.html',
  styleUrls: ['./auto-principal.page.scss'],
})
export class AutoPrincipalPage implements OnInit {

  @ViewChild('onPlay', { static: false}) master: IonSlides;

  @ViewChild('aadds', { static: false}) adss: IonSlides;
  @ViewChild('notti', { static: false}) nott: IonSlides;


  playerss: any ;
  waitingPlayer : any;

  public misHipodromo : any;

  public lista : any;

  public linkWait : SafeResourceUrl;

  public hipodromoActive : any;

  public hipodromosCorriendo : any;

  public isPlayin : boolean = false;

  public adPlayer: any;

  public publicidadesTrans : any;

  public misPronosticos: any;

  episodios={
    initialSlide: 0,
    slidesPerView: 4,
    speed: 400,
    direction:'vertical',
  autoplay:{
      delay:4000
    }
  }

  ads={
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
  autoplay:{
      delay:6000
    }
  }

  noticias={
    initialSlide: 0,
    slidesPerView: 3,
    speed: 400,
  /*autoplay:{
      delay:6000
    }*/
  }

 slideOpts = {
  initialSlide: 0,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  }

  constructor(public sanitaizer : DomSanitizer,public app : TriviaService,public http : HttpClient,) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    console.log('entra')
    this.master.update()
   this.nott.update()
     
    




    this.app.getHipodromo().subscribe(item =>{
      this.misHipodromo = item

      this.misHipodromo = this.misHipodromo.filter(item => item.enVivo === true)
      this.misHipodromo = this.misHipodromo.filter(item => item.set === true)
      this.misHipodromo = this.misHipodromo.sort(sortBy('cuantoFalta'))
      let Corriendo : any = this.misHipodromo.filter(item => item.cuantoFalta === 0)
      let CorriendoV : any = Corriendo.filter(item => item.state === 'Corriendo')

      console.log(this.misHipodromo)

      


      this.hipodromosCorriendo =  CorriendoV[Math.floor((Math.random()*CorriendoV.length))]
      console.log('Actualizo el hipodromo a la principal')
      console.log(this.hipodromosCorriendo , ' estas undefinded')

  
      

      if(this.hipodromoActive){
        let hipodromoArray : any = this.misHipodromo.filter(item => item.nombre === this.hipodromoActive.nombre)
        this.hipodromoActive  = hipodromoArray[0]
        

        console.log(this.hipodromoActive, ' Existes?')

        if(this.hipodromoActive.state === 'Corriendo'){
          console.log('estas corriendo')
        }

        if(this.hipodromoActive.state === 'Repeticion'){
          console.log('No haces nada, estas en repeticion')
        }

        if(this.hipodromoActive.state === 'En Espera'){
          console.log('no existe el hipodromo')
          this.hipodromoActive = null
        this.master.slideTo(2)
        this.adPlayer.muted(false)
        this.waitingPlayer.muted(true)

        if(this.hipodromosCorriendo){
          this.hipodromoActive = this.hipodromosCorriendo
          this.master.slideTo(0)
          this.openOtherVideo()
          this.openBumper(this.hipodromoActive.bumperEntrada, 'Entrada')
          
          this.adPlayer.muted(true)
        }

        }
      }else{
        console.log('no existe el hipodromo')
        this.master.slideTo(2)
        this.adPlayer.muted(false)

        if(this.hipodromosCorriendo){
          this.hipodromoActive = this.hipodromosCorriendo
          this.master.slideTo(0)
          this.openOtherVideo()
          this.openBumper(this.hipodromoActive.bumperEntrada, 'Entrada')
          
          this.adPlayer.muted(true)
        }else{
          console.log('no hay hipodromos en vivo')
        }
         }
     
      

    })

    this.app.getPronostico().subscribe(item =>{
      let ShortDate = '31 de Diciembre'


      this.misPronosticos = item;

      this.misPronosticos = this.misPronosticos.filter(item => item.date === ShortDate)

      console.log(this.misPronosticos)
    })


    this.app.getadTransmision().subscribe(item => {
      this.publicidadesTrans = item
    })

  //  this.direction()

  this.openAd()

  this.adss.update()
  


    
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   direction(){

    var timerPron = setInterval(()=>{
      
     
    

      
    }, 1000)


   }


  async openBumper(bumperEntrada : string, isState : string){

    if(isState === 'Rotativo'){

      this.isPlayin = true
      this.playerss = videojs(document.getElementById('produccionVideoTest'));
    
      this.playerss.poster('../../../../assets/other/poster1.jpg')
               
      this.playerss.src({
        type: 'application/dash+xml',
        src: bumperEntrada
      });
      
     
      
     
  
      this.master.slideTo(0);
      await this.sleep(3000)
      
      this.playerss.play();
      
  
    
  
      var timerPron = setInterval(()=>{
        let current = this.playerss.currentTime()
        let dura = this.playerss.duration()
      
  
  
      if(current === dura){
        clearInterval(timerPron);
        console.log('el video se termino')
        this.master.slideNext()
       this.abrirVideo()
      }
        
      }, 250)
      
  
  
  

    }else{

      if(isState === 'Propaganda'){

         this.isPlayin = true
      this.playerss = videojs(document.getElementById('produccionVideoTest'));
    
      this.playerss.poster('../../../../assets/other/poster1.jpg')
               
      this.playerss.src({
        type: 'application/dash+xml',
        src: bumperEntrada
      });
      
     
      
     
  
      this.master.slideTo(0);
      this.playerss.play();
      this.playerss.loop(true)
  
    
  
      var timerPron = setInterval(()=>{
       
      
  
  
      if(this.hipodromoActive.state === 'Corriendo'){
        clearInterval(timerPron);
        console.log('el video se termino')
        this.playerss.pause()
        this.master.slideNext()
       this.abrirVideo()
      }
        
      }, 250)
      
  
  

      }else{
 this.isPlayin = true
      this.playerss = videojs(document.getElementById('produccionVideoTest'));
    
      this.playerss.poster('../../../../assets/other/poster1.jpg')
               
      this.playerss.src({
        type: 'application/dash+xml',
        src: bumperEntrada
      });
      
     
      
     
  
      this.master.slideTo(0);
      this.playerss.play();


  
    
  
    

      this.playerss.on('ended',()=>{
        console.log('el video se termino')
        this.abrirVideo()
        this.master.slideTo(1)
      })
      
  
  
      }
     
  
    }

   
   
   }


   

  async openOtherVideo(){
    console.log('estas abriendo otro video')
    await this.sleep(500)

    this.waitingPlayer = videojs(document.getElementById('waitingVideo'));
    
    this.waitingPlayer.poster('../../../../assets/other/poster1.jpg')

    const withoutLastFourChars = this.hipodromoActive.youtube.slice(this.hipodromoActive.youtube.length -11);

    
    
    this.waitingPlayer.src({
      type: 'video/youtube',
        src:'https://www.youtube.com/embed/' + withoutLastFourChars
    });
    this.waitingPlayer.muted(true)
    this.waitingPlayer.play()
   
    console.log('jalando el espera, comenzo')

    /*
    let toLive : string = 'https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/'+this.misHipodromo[0].link
    this.http.get(toLive, {
    headers: new HttpHeaders().set('Authorization', 'Bearer mfNjR1s6zn-JwlY-vsHsVeoYIkwydE2rDSBOOdS5'),
  }).subscribe(snap=>
    { 
      this.lista=snap

   
    }); */
   }
   async openAd(){

    this.adPlayer = videojs(document.getElementById('ad'));
    
    this.adPlayer.poster('../../../../assets/other/poster1.jpg')

    
    this.adPlayer.src({
      type: 'video/youtube',
        src:'https://www.youtube.com/embed/YGKqtXrbp8s'
    });
    this.adPlayer.muted(true)
    this.adPlayer.loop(true)
    this.adPlayer.play()
   
    console.log('jalando el espera, comenzo')


    

    /*
    let toLive : string = 'https://api.cloudflare.com/client/v4/accounts/d6637d8f66830328b1fa3437216868a2/stream/'+this.misHipodromo[0].link
    this.http.get(toLive, {
    headers: new HttpHeaders().set('Authorization', 'Bearer mfNjR1s6zn-JwlY-vsHsVeoYIkwydE2rDSBOOdS5'),
  }).subscribe(snap=>
    { 
      this.lista=snap

   
    }); */
   }

  async abrirVideo(){
    await this.sleep(2000)
    this.waitingPlayer.muted(false)
  }

  quitarMudo(){

  }

}
