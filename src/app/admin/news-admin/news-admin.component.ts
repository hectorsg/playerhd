import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { TriviaService } from 'src/app/servicios/trivia.service';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss'],
})
export class NewsAdminComponent implements OnInit {

  public newsArray : any;
  public addNew : boolean
  public titulo : string;
  public contenido : string;
  public FullMonth : string;

  constructor(public modal : ModalController, public action : ActionSheetController, public app : TriviaService,
              public db : AngularFirestore) { }

  ngOnInit() {
    this.app.getNews().subscribe(item => {
      this.newsArray = item
    })
    this.addNew = false
  }

  dismissModal(){
    this.modal.dismiss()
  }

  volverNew(){
    this.addNew = false
    this.titulo = null
    this.contenido = null

  }
  


  async opcion(){
    const actionSheet = await this.action.create({
      header: 'Espera un momento',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Agregar News',
          handler: () => {
            this.addNew = true
          }
        }, {
          text: 'Cerrar',
          role: 'destructive',
          handler: () => {
            this.dismissModal()
          }
        },{
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }


  async opcionItem(item){
    const actionSheet = await this.action.create({
      header: 'Que deseas hacer?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
          }
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.db.collection('news').doc(item.id).delete()
          }
        },{
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }


  addNoticia(){
    let d = new Date();
    let day = d.getDate()
    let n = d.getMonth()
    let m = d.getMinutes()
    let h = d.getHours();
    let year = d.getFullYear();
    let minutes : string
    let hor : string;

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        break;
      case 1:
        this.FullMonth = "Febrero";
        break;
      case 2:
        this.FullMonth = "Marzo";
        break;
      case 3:
        this.FullMonth = "Abril";
        break;
      case 4:
        this.FullMonth = "Mayo";
        break;
      case 5:
        this.FullMonth = "Junio";
        break;
      case 6:
        this.FullMonth = "Julio";
        break;
      case 7:
          this.FullMonth = "Agosto";
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          break;
    }

    if(m < 10){
      minutes = '0'+m
    }else{
      minutes = ''+m
    }

    if(h < 10){
      hor = '0'+h
    }else{
      hor = ''+h
    }

    let hora : string = hor + ':'+minutes

    let fechaOnString : string = day.toString() + ' de ' + this.FullMonth + ' de '+ year
    console.log(hora)
    console.log(fechaOnString)

    this.db.collection('news').add({
      title : this.titulo,
      content: this.contenido,
      type:'Normal',
      date:fechaOnString,
      hora:hora,
      is:'normal',

    }).then(()=>{
      this.volverNew()
    })
  }




}
