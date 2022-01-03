import { Component, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from '../servicios/trivia.service';

import { IonSlides } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

declare var videojs : any ;

@Component({
  selector: 'app-auto-hipodromos',
  templateUrl: './auto-hipodromos.page.html',
  styleUrls: ['./auto-hipodromos.page.scss'],
})
export class AutoHipodromosPage implements OnInit {
  @ViewChild('onHipPlay', { static: false}) masterProduccion: IonSlides;
  public hipodromosAll : any;
  public hipodromoOpen : any;

  hipodromoEnVivo : any;

  faltaPoco : any;

  public dateFalta : number;

  public dateFaltaGame : number;


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

  constructor(public app : TriviaService, public db : AngularFirestore) { }

  ngOnInit() {

    
    this.app.getHipodromo().subscribe(item => {
      this.hipodromosAll = item

      this.hipodromosAll = this.hipodromosAll.filter(item => item.actividad === true)

      this.hipodromosAll = this.hipodromosAll.filter(item => item.set === true)

      console.log(this.hipodromosAll) 
      if(this.hipodromoOpen){
        let hipodromoArray : any = this.hipodromosAll.filter(item => item.nombre === this.hipodromoOpen.nombre)

        console.log('Existe el hipodromo y estas esperando')

        console.log(hipodromoArray[0])
        this.hipodromoOpen = hipodromoArray[0]

         if(hipodromoArray[0].state === 'Termino'){
          this.db.collection('hipodromos').doc(this.hipodromoOpen.id).update({
            state : 'En Espera'
          }).then(()=>{
            this.hipodromoOpen = hipodromoArray[0]
            this.countDown()
          })
          this.faltaPoco.play()

          this.masterProduccion.slideTo(0)

          this.hipodromoEnVivo.muted(true)

          console.log('Estas en espera para la proxima carrera')
         } 


      }else{

      }
    })
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  async openHipodromo(item){
    this.hipodromoOpen = item

    console.log()
    console.log(item)
await this.sleep(500)
    this.faltaPoco = videojs(document.getElementById('waitingVideoHipodromo'));
    
      this.faltaPoco.poster('../../../../assets/other/poster1.jpg')
               
      this.faltaPoco.src({
        type: 'application/dash+xml',
        src: this.hipodromoOpen.bumperFaltaPoco
      });
      
     
      
     
      
      this.faltaPoco.play();

      this.initializeHipodromo(item)


      await this.sleep(1000)

      this.countDown()
  }


  countDown(){
   
    var gameTimer = setInterval(()=>{


      
        this.db.collection('hipodromos').doc(this.hipodromoOpen.id).update({
          cuantoFalta : this.hipodromoOpen.cuantoFalta - 1
        }).then(()=>{
          let hipodromoArray : any = this.hipodromosAll.filter(item => item.nombre === this.hipodromoOpen.nombre)
  
         
  
          console.log(hipodromoArray)
  
          this.hipodromoOpen = hipodromoArray[0]
        })



        if(this.hipodromoOpen.cuantoFalta === 0){
          this.dateFalta = 0
        
          let hipodromoArray : any = this.hipodromosAll.filter(item => item.nombre === this.hipodromoOpen.nombre)
  
         
  
          console.log(hipodromoArray)
  
          this.hipodromoOpen = hipodromoArray[0]
          this.db.collection('hipodromos').doc(this.hipodromoOpen.id).update({
            cuantoFalta : 0,
            state:'Corriendo'
          })
          console.log(this.dateFalta)
  
          this.faltaPoco.pause()
  
          this.masterProduccion.slideTo(1)
  
          this.hipodromoEnVivo.muted(false)
          clearInterval(gameTimer)

        }

        let hipodromoArray : any = this.hipodromosAll.filter(item => item.nombre === this.hipodromoOpen.nombre)
  
         
  
          console.log(hipodromoArray)
  
          this.hipodromoOpen = hipodromoArray[0]
        
       

     

    }, 1000*60)
  }

async initializeHipodromo(item){
    await this.sleep(500)
    this.hipodromoEnVivo = videojs(document.getElementById('LiveVideoHipodromo'));
    
      this.hipodromoEnVivo.poster('../../../../assets/other/poster1.jpg')

      const withoutLastFourChars = item.carreraSource.slice(item.carreraSource.length -11);
               
      this.hipodromoEnVivo.src({
        type: 'video/youtube',
        src: 'https://www.youtube.com/embed/' + withoutLastFourChars
      });
      
     
      
     
      
      this.hipodromoEnVivo.play();
  }

}
