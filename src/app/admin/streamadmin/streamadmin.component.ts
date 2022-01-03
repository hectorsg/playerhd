import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-streamadmin',
  templateUrl: './streamadmin.component.html',
  styleUrls: ['./streamadmin.component.scss'],
})
export class StreamadminComponent implements OnInit {

  public type : string;
  public link : string;

  constructor(public db : AngularFirestore, public modal : ModalController) { }

  ngOnInit() {}

  changeLink(){
    this.db.collection('canalconfig').doc('S0VujcLdWg9EEJyPVfPA').update({
      type:this.type,
      tvLink:this.link
    }).then(()=>{
      this.modal.dismiss()
    })
  }

  test(){
    console.log(this.type)
    console.log(this.link)
  }

  dismissModal(){
    this.modal.dismiss()
  }

}
