import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { ProninterComponent } from '../proninter/proninter.component';
import sortBy from 'sort-by';

@Component({
  selector: 'app-allpicks',
  templateUrl: './allpicks.component.html',
  styleUrls: ['./allpicks.component.scss'],
})
export class AllpicksComponent implements OnInit {

  public pronostico : any = {
    talentPhoto: "https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/gustavo%2Fjose.jpg?alt=media&token=6b60b308-674b-425d-b906-186c7aea9d9f",
    videoUrl: "https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2Fqrud9hfqhfl?alt=media&token=2dc87e40-a43b-4209-9c5f-ea07db67a975",
    type: "Pronostico",
    pais: "USA",
    descripcion: "RAINBOW PICK SIX EN GULFSTREAM PARK: 4ta) 3  5  2/ 5ta) 10  4  3  9/ 6ta) 5  6  3  4/ 7ma) 8  2   3/ 8va) 7 FIJO/ 9na) 9  2  6  7...Suerte..",
    videoOptimizado: "no tiene",
    hipodromo: "Gulfstream Park",
    urgente: true,
    date: "19 de Enero",
    aproved: "aprobado",
    originalVideo: "https://firebasestorage.googleapis.com/v0/b/grtv-2c63e.appspot.com/o/pronosticos%2Fqrud9hfqhfl?alt=media&token=2dc87e40-a43b-4209-9c5f-ea07db67a975",
    fecha: "0119",
    hour: "19:38",
    talentName: "Jose Armao",
    id: "ErF3XjKy2TpQP6fx9wQv",
    picks:[{name:'hola'}]
}

public country : any;
public day : number;
public FullMonth : string;
public pronosticoArray : any;
public montNum : string;
public jugadasArray : any;
public dateFilter : string;

  constructor(public modal : ModalController, public actionSheetController : ActionSheetController,public pop : PopoverController,
    public inBro : InAppBrowser, public nav : NavParams, public app : TriviaService) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.country = this.nav.get('item');

    let d = new Date();
    this.day = d.getDate();
    let year = d.getFullYear()
    let m = d.getMonth()

    switch(m) {
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

    if(this.day >= 0 && this.day <10){
      this.dateFilter = `${year}${this.montNum}0${this.day}`
    }else{
      this.dateFilter = `${year}${this.montNum}${this.day}`
    }
    

    this.app.getPronosticoByPais(this.country.name, this.dateFilter).subscribe(item =>{
      this.pronosticoArray = item

      

    //  this.pronosticoArray = this.pronosticoArray.filter(item => item.picks)
      this.pronosticoArray.sort(sortBy('-hour'))
      console.log(this.pronosticoArray)
    })

    this.app.getJugadaSponsorByPais(this.country.name).subscribe(item =>{
      this.jugadasArray = item;
    })



  


   

  }

  dismiss(){
    this.modal.dismiss()
  }

  async presentPopover(ite) {
    console.log(this.pronostico)
    this.modal.dismiss()
    const popover = await this.pop.create({
      component: ProninterComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        item:ite,
        is:'Pick'
      },
      translucent: true
    });
    await popover.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.country.name,
      cssClass: 'my-custom-class',
      buttons: this.createButtonsJugada()
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  createButtonsJugada(){
    let buttons = [];
    for (let index of this.jugadasArray) {
      let button = {
        text:index.nameSponsor,
        handler: () => {
          this.openLinkJuega(index.link);
          return true;
        }
      }
      buttons.push(button);
    }
    return buttons;
  }


  openLinkJuega(item){
    this.inBro.create(item, '_system')
  }


}
