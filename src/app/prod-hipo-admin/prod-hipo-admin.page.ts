import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../servicios/trivia.service';

import * as numeral from 'numeral'
import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-prod-hipo-admin',
  templateUrl: './prod-hipo-admin.page.html',
  styleUrls: ['./prod-hipo-admin.page.scss'],
})
export class ProdHipoAdminPage implements OnInit {

  public hipodromoOpen : any;

  public hipodromosAll : any;

  public howMuchTime : number;

  public whatRace : string;

  public FullMonth : string;

  public montNum : string;

  public linkEnvivo : SafeResourceUrl;

  public minnut : string;

  public minnutOficial : string;
  constructor(public app : TriviaService,public sanitaizer : DomSanitizer, public db : AngularFirestore) { }

  ngOnInit() {

    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item


      this.hipodromosAll = this.hipodromosAll.filter(item => item.enVivo === true)

      this.hipodromosAll = this.hipodromosAll.filter(item => item.set === true)

      if(this.hipodromoOpen){
        let aa : any = this.hipodromosAll.filter(item => item.nombre === this.hipodromoOpen.nombre)

        console.log(aa, ' este es la prueba')

        this.hipodromoOpen = aa[0]
      }
    })
  }

  openHipodromo(items){
    const withoutLastFourChars = items.youtube.slice(items.youtube.length -11);

console.log(withoutLastFourChars)

this.linkEnvivo=  this.sanitaizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + withoutLastFourChars)

    this.hipodromoOpen = items
    
  }

  updateHipodromo(){
  

this.db.collection('hipodromos').doc(this.hipodromoOpen.id).update({
      cuantoFalta:numeral(this.howMuchTime ).value(),
      state : 'Termino',
      carreraNro:this.whatRace,
    }).then(()=>{
      this.whatRace = null
    this.howMuchTime = null
    })
  }

  Volver(){
    this.hipodromoOpen = null
    this.whatRace = null
    this.howMuchTime = null
  }

  inRepeticion(){
    this.db.collection('hipodromos').doc(this.hipodromoOpen.id).update({
      state:'Repeticion'
    })
  }

}
