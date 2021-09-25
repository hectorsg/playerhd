import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from '../servicios/trivia.service';
import * as numeral from 'numeral'

@Component({
  selector: 'app-envivo-admin',
  templateUrl: './envivo-admin.component.html',
  styleUrls: ['./envivo-admin.component.scss'],
})
export class EnvivoAdminComponent implements OnInit {


  public hipodromosAll : any;

  public adduR : string;

  public hipodromoData : any;

  public newUrl : string;

  public FullMonth : string;

  public superShortDate : string;

  public mesEstreno : string;

  public FechaDate : string;

  public EpisodioLongDate : string;

  public dayOfTheWeek : string;

  public EpisodioShortDate : string;

  public episodiosAll : any;

  public capituloNro : number;

  public getDescripcion : any;

  public newsHip : any;

  public FullMonthV : string;

  public month : string;

  public newYoutube :string;
  constructor(public modal : ModalController, public app : TriviaService, public action : ActionSheetController,
              public db : AngularFirestore, public toast : ToastController) { }

  ngOnInit() {

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
        this.FullMonthV = "Enero";
        break;
      case 1:
        this.FullMonthV = "Febrero";
        break;
      case 2:
        this.FullMonthV = "Marzo";
        break;
      case 3:
        this.FullMonthV = "Abril";
        break;
      case 4:
        this.FullMonthV = "Mayo";
        break;
      case 5:
        this.FullMonthV = "Junio";
        break;
      case 6:
        this.FullMonthV = "Julio";
        break;
      case 7:
          this.FullMonthV = "Agosto";
          break; 
      case 8:
          this.FullMonthV = "Septiembre";
          break; 
          
      case 9:
          this.FullMonthV = "Octubre";
          break; 
      case 10:
          this.FullMonthV = "Noviembre";
          break; 
          
      case 11:
          this.FullMonthV = "Diciembre";
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

    let fechaOnString : string = day.toString() + ' de ' + this.FullMonthV + ' de '+ year

    

    this.app.getHipodromo().subscribe(item =>{
      this.hipodromosAll = item

      this.hipodromosAll = this.hipodromosAll.filter(item => item.actividad === true)

      this.app.getNews().subscribe(item => {
        this.newsHip = item
        this.newsHip = this.newsHip.filter(item => item.date === fechaOnString)
        this.newsHip = this.newsHip.filter(item => item.is === 'hipodromo' )
   
     
        

      // 
      })
    })

  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }

  cerrarModal(){
    this.modal.dismiss()
  }

  async preguntarAntes(itemw) {

    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Agregar Link en Vivo',
        handler: () => {
          this.openUrl(itemw)
        }
      } ,{
        text: 'Agregar en Noticia',
        handler: () => {
          this.addingNews(itemw)
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();

    
  }

  async yaHayNoticia() {
    const toast = await this.toast.create({
      message: 'La noticia de este hipodromo ya esta publicada.',
      duration: 3500
    });
    toast.present();
  }


  async HayNoticia() {
    const toast = await this.toast.create({
      message: 'La noticia de este hipodromo publicada con exito.',
      duration: 3500,
      color:'success'
    });
    toast.present();
  }


  async addingNews(x){
    let  newss : any = this.newsHip.filter(item => item.id === x.id)

    if(newss.length > 0){
      this.yaHayNoticia()
    }else{
      
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
        this.FullMonthV = "Enero";
        break;
      case 1:
        this.FullMonthV = "Febrero";
        break;
      case 2:
        this.FullMonthV = "Marzo";
        break;
      case 3:
        this.FullMonthV = "Abril";
        break;
      case 4:
        this.FullMonthV = "Mayo";
        break;
      case 5:
        this.FullMonthV = "Junio";
        break;
      case 6:
        this.FullMonthV = "Julio";
        break;
      case 7:
          this.FullMonthV = "Agosto";
          break; 
      case 8:
          this.FullMonthV = "Septiembre";
          break; 
          
      case 9:
          this.FullMonthV = "Octubre";
          break; 
      case 10:
          this.FullMonthV = "Noviembre";
          break; 
          
      case 11:
          this.FullMonthV = "Diciembre";
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

    let fechaOnString : string = day.toString() + ' de ' + this.FullMonthV + ' de '+ year
    

    let titulo : string = 'Hoy en Vivo ' +  x.nombre + ', ' +  x.pais
    let contenidos : string =  'Hoy corre ' +x.nombre + ', solo por GRTV, si te perdiste la transmision, puedes retomarla esta noche en diferido desde la seccion de destacado.'
    let titleIng : string = 'Live Today ' + x.nombre + ', ' + x.pais
    this.db.collection('news').doc(x.id).set({
      title : titulo,
      titleIng :titleIng ,
      content: contenidos,
      type:'Normal',
      date:fechaOnString,
      hora:hora,
      hip:x,
      is:'hipodromo',
      accion:'Ver Gaceta'
    }).then(()=>{
      this.HayNoticia()
    })
    }

  }

  openUrl(item){
    this.adduR = 'bottom:0;'
    this.newUrl = null
    this.hipodromoData = item
  }

  cerrarAddurl(){
    this.newUrl = null
    this.adduR = 'bottom:-35%;'
  }

  async noHayLink() {
    const toast = await this.toast.create({
      message: 'No hay link para actualizar este hipodromo.',
      duration: 3500
    });
    toast.present();
  }

  async LinkActualizado() {
    const toast = await this.toast.create({
      message: 'Este hipodromo se acaba de actualizar correctamente.',
      duration: 3500,
      color:'success'
    });
    toast.present();
  }

  seeWha(){
    
    let d = new Date();

    let hour = d.getHours();
    let minutes = d.getMinutes();

    let hourD : string;
    let minuteD : string;



    if(hour < 10){
      hourD = '0'+hour
    }else{
      hourD = ''+hour
    }

    if(minutes < 10 ){
      minuteD = '0'+minutes
    }else{
      minuteD = ''+minutes
    }


    let startHoour : string = hourD+':'+minuteD

    console.log(startHoour)

    console.log(hour)
  }


  updateEnVivo(){

    
    let d = new Date();

    let hour = d.getHours();
    let minutes = d.getMinutes();

    let hourD : string;
    let minuteD : string;



    if(hour < 10){
      hourD = '0'+hour
    }else{
      hourD = ''+hour
    }

    if(minutes < 10 ){
      minuteD = '0'+minutes
    }else{
      minuteD = ''+minutes
    }


    let startHoour : string = hourD+':'+minuteD
    if(this.newUrl === null){
      this.noHayLink()
    }else{
      this.db.collection('hipodromos').doc(this.hipodromoData.id).update({
        enVivo: true,
        link:this.newUrl,
        startHour:startHoour,
        youtube:this.newYoutube
      }).then(()=>{

        this.db.collection('hipodromos').doc(this.hipodromoData.id).valueChanges().subscribe(item => { 
          let  newss : any = this.newsHip.filter(item => item.id === this.hipodromoData.id)

        if(newss.length > 0){
          let newTitle : string = 'Disfruta Ahora en Vivo ' +  this.hipodromoData.nombre + ', ' +  this.hipodromoData.pais
          let TitleIng : string = 'Enjoy Live Now ' + this.hipodromoData.nombre + ', '+ this.hipodromoData.pais
          this.db.collection('news').doc(this.hipodromoData.id).update({
            title : newTitle,
            titleIng: TitleIng,
            type:'En Vivo',
            accion:'Ver Hipodromo',
            hip:item
          })
        }else{

        }
        })
        
       



        this.LinkActualizado()
        this.cerrarAddurl()
      })
    }
   
  }

  async preguntarTerminar(itemw) {

    this.app.getEpisodio().subscribe(item=>{
      this.episodiosAll = item

      let howLen:any = this.episodiosAll.filter(item => item.nombre === itemw.nombre)

      this.getDescripcion = howLen[0]
  
      this.capituloNro = howLen.length + 1
    })

    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Terminar En Vivo',
        role: 'destructive',
        handler: () => {
          this.finalizarEnVivo(itemw)
        }
      }   ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  finalizarEnVivo(item){

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    let today = d.getDay();


    let hour = d.getHours();
    let minutes = d.getMinutes();

    let hourD : string;
    let minuteD : string;



    if(hour < 10){
      hourD = '0'+hour
    }else{
      hourD = ''+hour
    }

    if(minutes < 10 ){
      minuteD = '0'+minutes
    }else{
      minuteD = ''+minutes
    }


    
    let endHoour : string = hourD+':'+minuteD

    switch(n) {
      case 0:
        this.FullMonth = "Enero";
        this.mesEstreno = '1'
        break;
      case 1:
        this.FullMonth = "Febrero";
        this.mesEstreno = '2'
        break;
      case 2:
        this.FullMonth = "Marzo";
        this.mesEstreno = '3'
        break;
      case 3:
        this.FullMonth = "Abril";
        this.mesEstreno = '4'
        break;
      case 4:
        this.FullMonth = "Mayo";
        this.mesEstreno = '5'
        break;
      case 5:
        this.FullMonth = "Junio";
        this.mesEstreno = '6'
        break;
      case 6:
        this.FullMonth = "Julio";
        this.mesEstreno = '7'
        break;
      case 7:
          this.FullMonth = "Agosto";
          this.mesEstreno = '8'
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          this.mesEstreno = '9'
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          this.mesEstreno = '10'
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          this.mesEstreno = '11'
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          this.mesEstreno = '12'
          break;
    }


    switch(n) {
      case 0:
        this.month = "January";
        
        break;
      case 1:
        this.month = "February";
        
        break;
      case 2:
        this.month = "March";
        
        break;
      case 3:
        this.month = "April";
        
        break;
      case 4:
        this.month = "May";
        
        break;
      case 5:
        this.month = "June";
        
        break;
      case 6:
        this.month = "July";
        
        break;
        case 7:
        this.month = "August";
        
        break;
        case 8:
        this.month = "September";
        
        break;
        case 9:
        this.month = "October";
        
        break;
        case 10:
        this.month = "November";
        
        break;
        case 11:
        this.month = "December";
        
        break;
    }




    switch(today) {
      case 0:
        this.dayOfTheWeek = "Dom";
        break;
      case 1:
        this.dayOfTheWeek = "Lun";
        break;
      case 2:
        this.dayOfTheWeek = "Mar";
        break;
      case 3:
        this.dayOfTheWeek = "Mie";
        break;
      case 4:
        this.dayOfTheWeek = "Jue";
        break;
      case 5:
        this.dayOfTheWeek = "Vie";
        break;
      case 6:
        this.dayOfTheWeek = "Sab";
    }


    let endHourCode = this.mesEstreno +'/'+day+ '/'+ year + ' '+ endHoour
    this.EpisodioLongDate = day + ' de ' + this.FullMonth + ' de ' + year;
    this.EpisodioShortDate = this.dayOfTheWeek +' '+ day +'/'+this.mesEstreno;
    let fechaFilter = this.mesEstreno+day
    this.superShortDate = day + ' de '+ this.FullMonth
    
    if(numeral(day).value() >= 0 && numeral(day).value()<10){
      this.FechaDate = this.mesEstreno + '0'+day
    }else{
      this.FechaDate = this.mesEstreno+day
    }


    this.superShortDate = day + ' de '+ this.FullMonth

    let ingShortDate = this.month + ' '+ day

    let horarioVar : string = item.startHour + '/'+endHoour

   this.db.collection('hipodromos').doc(item.id).update({
      enVivo:false,
      lastDay: this.superShortDate,
      lastDayIng: ingShortDate
    })



    this.db.collection('episodios').add({
      nombre:item.nombre,
      capitulo:this.capituloNro,
      link:item.link,
      categoria: 'Hipismo' ,
      horario:horarioVar,
      descripcion:'¡Repetición de los mejores días de carreras del mundo! Sólo por GRTV',
      cover:item.cover,
      shortDate:this.EpisodioShortDate,
      longDate:this.EpisodioLongDate,
      day:this.dayOfTheWeek,
      destacado:true,
      endHour:endHourCode,
      semanaActiva:false,
      horaEnd:endHoour,
      pais:item.pais,
      propio:false,
      fecha:this.FechaDate

    }).then(()=>{
      let  newss : any = this.newsHip.filter(x=> x.id === item.id)

      if(newss.length > 0){
        let newTitle : string =   item.nombre + ', ' +  item.pais+', concluyo sus actividades, mira la repetición ahora'
        let newTitleIng : string = item.nombre + ', ' + item.pais + ', ended its activities for today, watch the replay now'
        this.db.collection('news').doc(item.id).update({
          title : newTitle,
          titleIng:newTitleIng,
          type:'Normal',
          accion:'Ver Repeticion'
        })
      }else{

      }
    })
  }


}
