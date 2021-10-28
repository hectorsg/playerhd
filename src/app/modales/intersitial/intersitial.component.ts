import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { GacetaComponent } from '../gaceta/gaceta.component';

@Component({
  selector: 'app-intersitial',
  templateUrl: './intersitial.component.html',
  styleUrls: ['./intersitial.component.scss'],
})
export class IntersitialComponent implements OnInit {

  public hip : any;

  constructor(public nav : NavParams, public pop : PopoverController, public modal : ModalController) { }

  ngOnInit() {

    this.hip = this.nav.get('hip')


    this.openGaceta()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

 async openGaceta(){

  await this.sleep(500)
    if(this.hip){
      this.pop.dismiss()
      const modal = await this.modal.create({
        component: GacetaComponent,
        cssClass: 'my-custom-class',
        componentProps:{
          item : this.hip
        }
      });
      return await modal.present();
    }
  }

}
