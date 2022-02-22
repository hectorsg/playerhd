import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/servicios/trivia.service';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-retro-admin',
  templateUrl: './retro-admin.component.html',
  styleUrls: ['./retro-admin.component.scss'],
})
export class RetroAdminComponent implements OnInit {

  public hipodromo : string;
  public allHipodromos : any;
  public myHipodromoSelected : any;
  public nombreApuesta : string;
  public link : string;
  public hook : string;
  public terminarHipodromo : boolean;


  public nombreRetro : string;
  public linkRetro : string;
  public hookRetro : string;

  public terminarHipodromoRetro : boolean;

  //Objetos para la subida de imagen
  uploadPercent : Observable<number>;
  urlImage : Observable<number>; 
  public url:string;


  uploadPercent2 : Observable<number>;
  urlImage2 : Observable<number>; 
  public url2:string;

  public paises : any;

  public pais : string;

  public pais2:string;

  public hipodromoSelected : string;

  constructor(public app : TriviaService, public storage : AngularFireStorage, public db : AngularFirestore, public modal : ModalController) { }

  ngOnInit() {

    this.app.getPaisName().subscribe(item =>{
      this.paises = item
    })


    this.app.getHipodromo().subscribe(item =>{
      this.allHipodromos = item
      console.log(this.allHipodromos)
    })

  }

  onUpload(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
 
    
   }

   
  onUpload2(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent2 = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref.getDownloadURL())).subscribe();
 
    
   }

   dismiss(){
    this.modal.dismiss()
   }

   addApuesta(){

    this.db.collection('jugadaSponsor').doc(this.nombreApuesta).set({
      cover : this.url,
      hook	: this.hook,
      link	:this.link,
      nameSponsor : this.nombreApuesta,
      pais:this.pais2,
      spot:9,
      hipodromoName:this.hipodromoSelected


    }).then(()=>{
      this.url = null
      this.hook = null
      this.link = null
      this.nombreApuesta = null
      this.uploadPercent = null
      this.urlImage = null
      this.pais2= null

      this.terminarHipodromo = true
    })
   }


   addRetros(){

    this.db.collection('retrospectosArray').doc(this.nombreRetro).set({
      cover : this.url2,
      hook	: this.hookRetro,
      link	:this.linkRetro,
      nombre : this.nombreRetro,
      pais:this.pais,
      onSystem: true,
      spot:4



    }).then(()=>{
      this.url2 = null
      this.hookRetro = null
      this.linkRetro = null
      this.nombreRetro = null
      this.uploadPercent2 = null
      this.urlImage2 = null

      this.terminarHipodromoRetro = true
    })
   }

  whatHipodromo(){
    this.myHipodromoSelected = this.allHipodromos.filter(item => item.nombre === this.hipodromo)
    console.log(this.myHipodromoSelected)
    this.terminarHipodromo = false
    this.terminarHipodromoRetro = false
  }

  sincronizarHipodromo(){
    this.db.collection('hipodromos').doc(this.myHipodromoSelected[0].uid).collection('apuestasArray').valueChanges().subscribe(item => {
      let res : any = item

      this.db.collection('hipodromos').doc(this.myHipodromoSelected[0].uid).update({
        apuestaArray : res
      }).then(()=>{
        console.log('todo salio bien')
        this.terminarHipodromo = false
      })
    })
  }

  sincronizarRetrospecto(){
    this.db.collection('hipodromos').doc(this.myHipodromoSelected[0].uid).collection('retrosArray').valueChanges().subscribe(item => {
      let res : any = item

      this.db.collection('hipodromos').doc(this.myHipodromoSelected[0].uid).update({
        retrosArray : res
      }).then(()=>{
        console.log('todo salio bien')
        this.terminarHipodromoRetro = false
      })
    })
  }

}
