import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

export interface userParticipante {
  aceleracion : string
  actitud : string
  agilidad : string
  concentracion : string
  expjinete : string
  horseName : string
  jinete : string
  nivel : string
  power : string
  rank : string
  rareza : string
  resistencia : string
  salud : string
  velocidad : string
  id : string
}
export interface apuestas{
id:string
name:string
disponible:string
}
export interface videoac{
  id:string
  comentario:string
  carrera:string
  pais:string
  corredores:any
  resultados:any
}

@Injectable({
  providedIn: 'root'
})
export class AccService {

  constructor(private db : AngularFirestore, private afAuth : AngularFireAuth) { }

  jugadoresSalas(id){

    return this.db.collection('apuestalesalas').doc(id).collection('jugadores', ref=> ref.where('isAdmin','==','false')).snapshotChanges().pipe(map(item => {
      return item.map(a => {
        const data = a.payload.doc.data() as userParticipante;
        data.id = a.payload.doc.id;
        return data;
      })
    }))      

}


apuestasArray(){

  return this.db.collection('apuestaslist', ref => ref.where('disponible','==','true')).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))      

}
videosAcc(pais){
  return this.db.collection('videosacc', ref => ref.where('pais','==',pais)).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))    
}

howTo(){
  return this.db.collection('howToAcc', ref => ref.orderBy('spot', 'asc')).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))    
}

horseSelectedUsers(id){
  return this.db.collection('apuestalesalas').doc(id).collection('jugadores', ref => ref.where('horseSelected','==',true)).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}

knowHowManyPlayers(id){
  return this.db.collection('apuestalesalas').doc(id).collection('jugadores').snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  })) 
}

salaApuestas(id){
  return this.db.collection('apuestalesalas').doc(id).collection('apuestas').snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  })) 
}
salaALL(){
  return this.db.collection('apuestalesalas').snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  })) 
}

howManyRestart(id){
  return this.db.collection('apuestalesalas').doc(id).collection('jugadores', ref => ref.where('restartGame','==',true)).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}
howManyViewRace(id){
  return this.db.collection('apuestalesalas').doc(id).collection('jugadores', ref => ref.where('carreraVista','==',true)).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}

frasesBienvenido(){
  return this.db.collection('frasesBienvenido').snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}


fotosBienvenidoPerfil(){
  return this.db.collection('fotosPerfilAcc').snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}

myPlays(id){
  return this.db.collection('apuestalesalas', ref => ref.where('adminId', '==' , id)).snapshotChanges().pipe(map(item => {
    return item.map(a => {
      const data = a.payload.doc.data() as apuestas;
      data.id = a.payload.doc.id;
      return data;
    })
  }))  
}
 }