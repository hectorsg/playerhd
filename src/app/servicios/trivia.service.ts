import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';


export interface item{
      id : string
      nombre:string
      capitulo:number
      link:string
      categoria:string
      horario:string
      descripcion:string
      cover:string
      shortDate:string
      longDate:string
 }

@Injectable({
  providedIn: 'root'
})
export class TriviaService {



  constructor(private angularFireDatabase: AngularFireDatabase,private storage: AngularFireStorage,
      public db : AngularFirestore) { }

     //Tarea para subir archivo
     tareaCloudStorage(nombreArchivo: string, datos: any) {
      return this.storage.upload(nombreArchivo, datos);
    }
  
    //Referencia del archivo
    referenciaCloudStorage(nombreArchivo: string) {
      return this.storage.ref(nombreArchivo);
    }
    
    getEpisodio(){

      return this.db.collection('episodios').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }
    getHipodromo(){

      return this.db.collection('hipodromos').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }


    getaccConfiguracion(){

      return this.db.collection('apuestaleConfig').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }


    getBiosQS(){

      return this.db.collection('QSbios').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getNews(){

      return this.db.collection('news').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }
    getHipodromobyPais(pais){

      return this.db.collection('hipodromos', ref => ref.where('pais', '==',pais)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getHipodromoConActividad(){

      return this.db.collection('hipodromos', ref => ref.where('actividad', '==',true)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getEpisodiobyHoy(date){
      return this.db.collection('episodios', ref => ref.where('longDate', '==',date)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }
    getEpisodiobyCat(date){
      return this.db.collection('episodios', ref => ref.where('categoria', '==',date)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }

    getEpisodiobyPais(pais){
      return this.db.collection('episodios', ref => ref.where('pais', '==',pais)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }

    getEpisodiobyNombre(nombre){
      return this.db.collection('episodios', ref => ref.where('nombre', '==',nombre)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }

    getPaisName(){

      return this.db.collection('paises').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getProgramaName(){
      return this.db.collection('programas').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getCatEpisodioName(){

      return this.db.collection('catepisodios').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }
    getRaces(id, day){

      return this.db.collection('hipodromos').doc(id).collection('carreras', ref => ref.where('day','==',day).where('semanaActiva','==',true)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getRacesAll(id){

      return this.db.collection('hipodromos').doc(id).collection('carreras', ref => ref.where('semanaActiva','==',true)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))      
    }

    getPopStream(id){
      return this.db.collection('users').doc(id).collection('config').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getMisEpisodios(userId){
      return this.db.collection('users').doc(userId).collection('vermastarde').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }
    getEnVivoConfig(){
      return this.db.collection('canalconfig').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getEncuesta(){
      return this.db.collection('encuestas').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getPronostico(){
      return this.db.collection('pronostico', ref => ref.orderBy('fecha', 'desc')).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getHowToApp(){
      return this.db.collection('howToApp', ref => ref.orderBy('spot', 'asc')).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getPatrocinadores(){
      return this.db.collection('patrocinadores').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }

    getTalentos(){
      return this.db.collection('users', ref => ref.where('talentos','==',true)).snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getFundacionNews(){
      return this.db.collection('fundacionpost').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      }))  
    }

    getRedesData(){
      return this.db.collection('redesNews').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }

    getAtreveteAnarrarData(){
      return this.db.collection('atrevetean').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }


    getMisEpisodiosVermas(){
      return this.db.collection('masepisodios').snapshotChanges().pipe(map(item => {
        return item.map(a => {
          const data = a.payload.doc.data() as item;
          data.id = a.payload.doc.id;
          return data;
        })
      })) 
    }
}
