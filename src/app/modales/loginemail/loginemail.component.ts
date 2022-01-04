import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-loginemail',
  templateUrl: './loginemail.component.html',
  styleUrls: ['./loginemail.component.scss'],
})
export class LoginemailComponent implements OnInit {

  public email:string;
  public password:string;

  constructor(public modal : ModalController, public afAuth: AngularFireAuth, public toastController:ToastController) { }

  ngOnInit() {}


  dismissModal(){
    this.modal.dismiss()
  }

  login(){
    this.afAuth.signInWithEmailAndPassword(this.email, this.password).then(ite=>{
      this.modal.dismiss()
      this.toast()
    })
  }

  async toast(){
    const toast = await this.toastController.create({
      message: 'Bienvenido de nuevo',
      duration: 2000,
      color:'success'
    });
    toast.present();
   }
}
