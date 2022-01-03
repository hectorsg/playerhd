import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import sortBy from 'sort-by';
@Component({
  selector: 'app-fundacion',
  templateUrl: './fundacion.component.html',
  styleUrls: ['./fundacion.component.scss'],
})
export class FundacionComponent implements OnInit {

  @ViewChild('fundCon', { static: false}) fundConteni: IonSlides;
  @ViewChild('funO', { static: false}) funOpen: IonSlides;
  @ViewChild('portada', { static: false}) portadaSli: IonSlides;

  public fundacionConfigu : any;
  public fundOppen : any;
  public fundacionPost : any;

  fund = {
      initialSlide:0,
      speed:400,
      direction:'vertical'
    
  }

  portadita = {
    initialSlide: 0,
    speed:400,
    direction:'vertical',
    autoplay:{
      delay:5000
    }
  }
  constructor(public app : TriviaService, public modal : ModalController) { }

  ngOnInit() {
    this.app.getaccConfiguracion().subscribe(item => {
      let allArray : any = item
      let fundacionConfi = allArray.filter(item => item.type === 'Fundacion')
      this.fundacionConfigu = fundacionConfi[Math.floor((Math.random()*fundacionConfi.length))]
    })


    this.app.getFundacionNews().subscribe(item => {
      this.fundacionPost = item

      this.fundacionPost.sort(sortBy('-fecha'))
    })
  }

  ionViewDidEnter(){
    this.fundConteni.update()
    this.portadaSli.update()
  }

  dissmissModal(){
    this.modal.dismiss()
  }

  verMas(){
    this.fundConteni.slideTo(1)
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }
  async verPostFund(item){
    this.fundOppen = item

    await this.sleep(500)
    this.funOpen.update()
  }
  
}
