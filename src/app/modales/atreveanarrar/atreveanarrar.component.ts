import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import * as numeral from 'numeral'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-atreveanarrar',
  templateUrl: './atreveanarrar.component.html',
  styleUrls: ['./atreveanarrar.component.scss'],
})
export class AtreveanarrarComponent implements OnInit {

  
  @ViewChild('atrev', { static: false}) atreveteSli: IonSlides;

  public atreveteArray : any;
  public atreveteOpen : any;


  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  
  public url:string;

  uploadPercent2 : Observable<number>;
  urlImage2 : Observable<number>;

  public myUser : any;
  
  public url2:string;
  constructor(public modal : ModalController, public app : TriviaService, 
              public storage : AngularFireStorage, public loadingController : LoadingController,
              public db : AngularFirestore, public afAuth : AngularFireAuth, public toast : ToastController) { }

  ngOnInit() {

    this.app.getAtreveteAnarrarData().subscribe(item =>{
      this.atreveteArray = item
    })

    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.myUser = item;
          
        })
       }
      }
  )
  }

  ionViewDidEnter(){
    this.atreveteSli.update()
  }

  comenzar(){
    this.atreveteSli.slideTo(1)
  }

  dissmissModal(){
      this.modal.dismiss()
  }

  openAtrevete(item){
    this.atreveteOpen = item
  }


  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `atreveanarrarvideos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }


   onUpload2(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `atreveanarrarvideos/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent2 = task.percentageChanges(); 
    task.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref.getDownloadURL())).subscribe();
 
    
   }


   enviarVideo(){

    if(this.myUser){
      this.db.collection('atrevetean').doc(this.atreveteOpen.id).collection('participantes').doc(this.myUser.uid).set({
        displayName : this.myUser.displayName,
        pais: this.atreveteOpen.pais,
        video: this.url,
        dni: this.url2,
        uid:this.myUser.uid
      }).then(()=>{
        this.atreveteOpen = null
      })
    }else{
      this.LinkActualizado()
    }
   
   }

   async LinkActualizado() {
    const toast = await this.toast.create({
      message: 'Inicia sesion o Registrate',
      duration: 3500,
      color:'danger'
    });
    toast.present();
  }
}
