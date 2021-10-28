import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { TriviaService } from '../servicios/trivia.service';
import * as numeral from 'numeral'
import sortBy from 'sort-by';

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

  public monthNum : string;

  public linkTypeIs : string;

  public episodiosByDay : any;

  public FechaDateEpisodios : string;

  public day : string;

  public monthNumEpiso : string;
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
    let today = d.getDay();

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

    switch(today) {
      case 0:
        this.day = "Dom";
        break;
      case 1:
        this.day = "Lun";
        break;
      case 2:
        this.day = "Mar";
        break;
      case 3:
        this.day = "Mie";
        break;
      case 4:
        this.day = "Jue";
        break;
      case 5:
        this.day = "Vie";
        break;
      case 6:
        this.day = "Sab";
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

    this.app.getEpisodio().subscribe(item =>{
      this.episodiosAll = item
      //Aqui va el filtro de Episodios Destacado
      let firstFilter =  this.episodiosAll.filter(item => item.destacado === true);
     
     // console.log(this.episodiosPropios)

     // console.log(this.episodiosPropios)
      //Aqui va el filtro de programacion y dias
      let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
      this.episodiosByDay = secondFilter.filter(item => item.day === this.day) 
      this.episodiosByDay = this.episodiosByDay.filter(item => item.categoria === 'Hipismo')
      this.episodiosByDay.sort(sortBy('horaEnd'));

      console.log(this.episodiosByDay)
      
   // this.episodiosAll = this.episodiosAll.filter(item=> item.semanaActiva === true)

    })

    

  }
  
  borrarEpisodios(){
    for(let item of this.episodiosByDay){
      this.db.collection('episodios').doc(item.id).delete().then(()=>{
        console.log(item.id+ ' Eliminado')
      })
    }
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
    let dd = d.getDay()
    let minutes : string
    let hor : string;

    switch(n) {
      case 0:
        this.FullMonthV = "Enero";
        this.monthNumEpiso = '01';
        break;
      case 1:
        this.FullMonthV = "Febrero";
        this.monthNumEpiso = '02';
        break;
      case 2:
        this.FullMonthV = "Marzo";
        this.monthNumEpiso = '03';
        break;
      case 3:
        this.FullMonthV = "Abril";
        this.monthNumEpiso = '04';
        break;
      case 4:
        this.FullMonthV = "Mayo";
        this.monthNumEpiso = '05';
        break;
      case 5:
        this.FullMonthV = "Junio";
        this.monthNumEpiso = '06';
        break;
      case 6:
        this.FullMonthV = "Julio";
        this.monthNumEpiso = '07';
        break;
      case 7:
          this.FullMonthV = "Agosto";
          this.monthNumEpiso = '08';
          break; 
      case 8:
          this.FullMonthV = "Septiembre";
          this.monthNumEpiso = '09';
          break; 
          
      case 9:
          this.FullMonthV = "Octubre";
          this.monthNumEpiso = '10';
          break; 
      case 10:
          this.FullMonthV = "Noviembre";
          this.monthNumEpiso = '11';
          break; 
          
      case 11:
          this.FullMonthV = "Diciembre";
          this.monthNumEpiso = '12';
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

    //Aqui va la escritura en la programacion de cada episodio
   // this.db.collection('news')

   
   if(numeral(day).value() >= 0 && numeral(day).value()<10){
    this.FechaDateEpisodios = this.monthNumEpiso + '0'+day
  }else{
    this.FechaDateEpisodios = this.monthNumEpiso+day
  }

   this.db.collection('episodios').doc(x.id+day+this.monthNumEpiso).set({
     ad:false,
     capitulo:1,
     categoria:'Hipismo',
     cover:x.cover,
     day:this.day,
     descripcion:'¡Repetición de los mejores días de carreras del mundo! Sólo por GRTV',
     destacado:false,
     //aqui van los datos de fecha y horas
     horario:'12:00/19:30',
     horaEnd:'19:00',
     endHour:this.monthNumEpiso+'/'+day+'/'+year+' 19:00',
     fecha:this.FechaDateEpisodios,
     link:x.youtube,
     longDate:fechaOnString,
     nombre:x.nombre,
     pais:x.pais,
     propio:false,
     semanaActiva:true,
     shortDate: this.day + ' '+ day+'/'+this.monthNumEpiso
   }).then(()=>{
    this.EpisodioCreado(x.nombre)
   })



    //Aqui va la escritura del news del hipodromo
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

  async openUrl(item){
    this.hipodromoData = item
    await this.sleep(500)
    this.adduR = 'bottom:0;'
    this.newUrl = null
    

    console.log(this.hipodromoData)
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

  async EpisodioCreado(item) {
    const toast = await this.toast.create({
      message: item + ' se acaba de actualizar correctamente.',
      duration: 3500,
      color:'success',
      position:'top'
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
    let n = d.getMonth();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let day = d.getDate()
    let hourD : string;
    let minuteD : string;


    
    switch(n) {
      case 0:
        this.FullMonthV = "Enero";
        this.monthNumEpiso = '01';
        break;
      case 1:
        this.FullMonthV = "Febrero";
        this.monthNumEpiso = '02';
        break;
      case 2:
        this.FullMonthV = "Marzo";
        this.monthNumEpiso = '03';
        break;
      case 3:
        this.FullMonthV = "Abril";
        this.monthNumEpiso = '04';
        break;
      case 4:
        this.FullMonthV = "Mayo";
        this.monthNumEpiso = '05';
        break;
      case 5:
        this.FullMonthV = "Junio";
        this.monthNumEpiso = '06';
        break;
      case 6:
        this.FullMonthV = "Julio";
        this.monthNumEpiso = '07';
        break;
      case 7:
          this.FullMonthV = "Agosto";
          this.monthNumEpiso = '08';
          break; 
      case 8:
          this.FullMonthV = "Septiembre";
          this.monthNumEpiso = '09';
          break; 
          
      case 9:
          this.FullMonthV = "Octubre";
          this.monthNumEpiso = '10';
          break; 
      case 10:
          this.FullMonthV = "Noviembre";
          this.monthNumEpiso = '11';
          break; 
          
      case 11:
          this.FullMonthV = "Diciembre";
          this.monthNumEpiso = '12';
          break;
    }



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

      this.db.collection('episodios').doc(this.hipodromoData.id+day+this.monthNumEpiso).update({
        link:this.newYoutube
      })
      this.db.collection('hipodromos').doc(this.hipodromoData.id).update({
        enVivo: true,
        link:this.newUrl,
        startHour:startHoour,
        youtube:this.newYoutube,
        linkType:this.linkTypeIs,
        linkCloudflare:this.newUrl
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

  updateEnVivoNuevo(){
      
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
        linkType:this.linkTypeIs,
        linkCloudflare:this.newUrl
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
      } ,{
        text: 'Actualizar Link',
        role: 'destructive',
        handler: () => {
          this.openUrl(itemw)
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
        this.mesEstreno = '1';
        this.monthNum = '01'
        break;
      case 1:
        this.FullMonth = "Febrero";
        this.mesEstreno = '2'
        this.monthNum = '02'
        break;
      case 2:
        this.FullMonth = "Marzo";
        this.mesEstreno = '3'
        this.monthNum = '03'
        break;
      case 3:
        this.FullMonth = "Abril";
        this.mesEstreno = '4'
        this.monthNum = '04'
        break;
      case 4:
        this.FullMonth = "Mayo";
        this.mesEstreno = '5'
        this.monthNum = '05'
        break;
      case 5:
        this.FullMonth = "Junio";
        this.mesEstreno = '6'
        this.monthNum = '06'
        break;
      case 6:
        this.FullMonth = "Julio";
        this.mesEstreno = '7'
        this.monthNum = '07'
        break;
      case 7:
          this.FullMonth = "Agosto";
          this.mesEstreno = '8'
          this.monthNum = '08'
          break; 
      case 8:
          this.FullMonth = "Septiembre";
          this.mesEstreno = '9'
          this.monthNum = '09'
          break; 
          
      case 9:
          this.FullMonth = "Octubre";
          this.mesEstreno = '10'
          this.monthNum = '10'
          break; 
      case 10:
          this.FullMonth = "Noviembre";
          this.mesEstreno = '11'
          this.monthNum = '11'
          break; 
          
      case 11:
          this.FullMonth = "Diciembre";
          this.mesEstreno = '12'
          this.monthNum = '12'
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
      this.FechaDate = this.monthNum + '0'+day
    }else{
      this.FechaDate = this.monthNum+day 
    }


    this.superShortDate = day + ' de '+ this.FullMonth

    let ingShortDate = this.month + ' '+ day

    let horarioVar : string = item.startHour + '/'+endHoour

   this.db.collection('hipodromos').doc(item.id).update({
      enVivo:false,
      lastDay: this.superShortDate,
      lastDayIng: ingShortDate,
      link:item.youtube,
      linkType:'Normal'
    })



    this.db.collection('episodios').add({
      nombre:item.nombre,
      capitulo:this.capituloNro,
      link:item.youtube,
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
      fecha:this.FechaDate,
      ad:false

    }).then(()=>{
      let  newss : any = this.newsHip.filter(x=> x.id === item.id)

      if(newss.length > 0){
       

        this.db.collection('hipodromos').doc(item.id).valueChanges().subscribe(itemToUp =>{

          let newToUpItem :any = itemToUp

          let newTitle : string =   item.nombre + ', ' +  item.pais+', concluyo sus actividades, mira la repetición ahora'
          let newTitleIng : string = item.nombre + ', ' + item.pais + ', ended its activities for today, watch the replay now'

          this.db.collection('news').doc(item.id).update({
            title : newTitle,
            titleIng:newTitleIng,
            type:'Normal',
            accion:'Ver Repeticion',
            hip:newToUpItem
          })
        })

        


      }else{

      }
    })
  }


}
