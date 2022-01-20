import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { AllpicksComponent } from '../allpicks/allpicks.component';
import { PicksComponent } from '../picks/picks.component';
import { PronosticoComponent } from '../pronostico/pronostico.component';

@Component({
  selector: 'app-proninter',
  templateUrl: './proninter.component.html',
  styleUrls: ['./proninter.component.scss'],
})
export class ProninterComponent implements OnInit {

  public item : any;

  constructor(public nav : NavParams, public pop : PopoverController, public modal : ModalController) { }

  ngOnInit() {

    this.item = this.nav.get('item')
    let whatIs : string = this.nav.get('is')

    if(whatIs === 'Pick'){

      this.openPronostico()
    }else{
      this.openPick()
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

   async openPronostico(){

    await this.sleep(500)
      if(this.item){
        this.pop.dismiss()
        const modal = await this.modal.create({
          component: PronosticoComponent,
          cssClass: 'my-custom-class',
          componentProps:{
            item : this.item
          }
        });
        return await modal.present();
      }
    }

    async openPick(){

      await this.sleep(500)
        if(this.item){
          this.pop.dismiss()
          const modal = await this.modal.create({
            component: AllpicksComponent,
            cssClass: 'my-custom-class',
            componentProps:{
              item : this.item
            }
          });
          return await modal.present();
        }
      }

}
