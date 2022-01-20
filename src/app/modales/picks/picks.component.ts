import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { ProninterComponent } from '../proninter/proninter.component';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-picks',
  templateUrl: './picks.component.html',
  styleUrls: ['./picks.component.scss'],
})
export class PicksComponent implements OnInit {

  public allData : any;
  public paisImage : string;
  public picks : any;
  public jugadaSponsor : any;

  constructor(public modal : ModalController, public nav : NavParams, public pop : PopoverController, public app : TriviaService,
    public sanitaizer : DomSanitizer, public inBro : InAppBrowser) { }

  ngOnInit() {

  }

  async presentPopover() {
    this.modal.dismiss()
    const popover = await this.pop.create({
      component: ProninterComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        item:this.allData,
        is:'Pick'
      },
      translucent: true
    });
    await popover.present();
  }
  ionViewDidEnter(){
    this.allData = this.nav.get('item')
    console.log(this.allData)

  this.picks =  this.allData.picks

  this.app.getJugadaSponsor().subscribe(item =>{
    let res : any = item;

    let filt : any = res.filter(item => item.hipodromoName === this.allData.hipodromo);

    this.jugadaSponsor = filt[0]
  })

    if(this.allData.pais === "Perú"){
      this.paisImage = '../../../assets/paises/peru.png'
    }
  }

  openLinkJuega(){
    let link:any =  this.sanitaizer.bypassSecurityTrustResourceUrl(this.jugadaSponsor.link)

    const web:string = link.changingThisBreaksApplicationSecurity
    this.inBro.create(web, '_system')
  }

  closeModal(){
this.modal.dismiss()
  }

}
