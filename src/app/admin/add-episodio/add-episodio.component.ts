import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController, IonSlides, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import sortBy from 'sort-by';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { TriviaService } from 'src/app/servicios/trivia.service';
import * as numeral from 'numeral'

@Component({
  selector: 'app-add-episodio',
  templateUrl: './add-episodio.component.html',
  styleUrls: ['./add-episodio.component.scss'],
})
export class AddEpisodioComponent implements OnInit {
  //Objetos para la subida de imagen
  uploadPercent : Observable<number>;
  urlImage : Observable<number>;
  public url:string;

  //Strings para los datos de el episodio
  public EpisodioLongDate:string;
  public EpisodioShortDate:string;
  public day:string;
  public FullMonth:string;
  public nombre : string;
  public capituloNro:number;
  public categoria : string;
  public horario : string;
  public descripcion : string;
  public episodioId:string;
  public link:string;
  public destacado:boolean;
  public semanaIsActive:boolean;
  public year:number;
  public dayOfTheWeek:string;
  public mesEstreno:string;
  public diaEstreno:string
  public hora:string;
  public pais : string;
  public propio:boolean;
  public superShortDate : string;

  // nuevas propiedades
  public addEpisodioNormal : boolean;
  public episodiosAll : any;
  public episodiosDestacado : any;
  public episodioDestacadoOtros : any;
  public episodiosByDay  : any;
  public PaisName : any;
  public monthNum : string;
  public addDestacado : boolean;
  public hipodromoName : any;
  public hipodr : string;
  public FechaDate : string;
  public episodiosPropios : any;
  public hipodromoToUpdate : any;
  public editPropio : any;


  //Variables para actualizar
  public EpisodioLongDateUp:string;
  public EpisodioShortDateUp:string;
  public dayUp:string;
  public FullMonthUp:string;
  public nombreUp : string;
  public capituloNroUp:number;
  public categoriaUp : string;
  public horarioUp : string;
  public descripcionUp : string;
  public episodioIdUp:string;
  public linkUp:string;
  public destacadoUp:boolean;
  public semanaIsActiveUp:boolean;
  public yearUp:number;
  public dayOfTheWeekUp:string;
  public mesEstrenoUp:string;
  public diaEstrenoUp:string
  public horaUp:string;
  public paisUp : string;
  public propioUp:boolean;
  public superShortDateUp : string;

  uploadPercentUp : Observable<number>;
  urlImageUp : Observable<number>;
  public urlUp:string;

  public programasName : any;

  
  @ViewChild('tww', { static: false}) epidAdmin: IonSlides;

  constructor(public storage : AngularFireStorage, public modal : ModalController, 
              public action : ActionSheetController, public db:AngularFirestore, 
              public app : TriviaService, public toast : ToastController) { }

  ngOnInit() {
    this.addEpisodioNormal = false
    this.addDestacado = false
    this.semanaIsActive = false
    this.destacado = false
    this.propio = false

    let d = new Date();
    let n = d.getMonth()
    let day = d.getDate()
    let year = d.getFullYear()
    this.year = year
    let today = d.getDay();


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

    this.EpisodioLongDate = this.diaEstreno + ' de ' + this.FullMonth + ' de ' + this.year;
     this.episodioId = Math.random().toString(36).substring(2);

     this.app.getProgramaName().subscribe(item =>{
       this.programasName = item
     })
  }

  capituloNombre(){
    this.nombre = this.hipodr

    let howLen:any = this.episodiosAll.filter(item => item.nombre === this.nombre)
    let hoow:any = howLen.filter(item => item.destacado === true) 
    this.capituloNro = hoow.length +1


    this.app.getHipodromo().subscribe(item => {
      let allHip : any = item

      this.hipodromoToUpdate = allHip.filter(item => item.nombre === this.hipodr)

      console.log(this.hipodromoToUpdate[0].id)
    })


  }

  ionViewDidEnter(){
    this.app.getEpisodio().subscribe(item => { 
      this.episodiosAll = item

      this.episodioDestacadoOtros = this.episodiosAll.filter(item => item.longDate !== this.EpisodioLongDate)
      this.episodiosDestacado = this.episodiosAll.filter(item => item.longDate === this.EpisodioLongDate)
      this.episodiosDestacado.sort(sortBy('horaEnd'))

      this.episodioDestacadoOtros = this.episodioDestacadoOtros.filter(item => item.longDate.includes(this.FullMonth))
      this.episodioDestacadoOtros.sort(sortBy('-fecha'))


      let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
      this.episodiosByDay = secondFilter.filter(item => item.day === this.day) 
      this.episodiosByDay.sort(sortBy('horaEnd'));

      this.episodiosPropios = this.episodiosAll.filter(item => item.propio === true);
      this.episodiosPropios = this.episodiosPropios.filter(item => item.fecha)
      this.episodiosPropios.sort(sortBy('-fecha'))
    })

    this.app.getPaisName().subscribe(item =>{
      this.PaisName = item
      this.PaisName.sort(sortBy('name'))
      
    })
    this.app.getHipodromo().subscribe(item => {
      this.hipodromoName = item
    })


    this.epidAdmin.update()
  }

  prueba(){
    console.log('hola')
  }

  changeDayEpisodio(da){
    this.day = da
    let secondFilter = this.episodiosAll.filter(item => item.semanaActiva === true);
    this.episodiosByDay = secondFilter.filter(item => item.day === this.day)
     this.episodiosByDay.sort(sortBy('horaEnd')) 
  }

  dissmissModal(){
    this.modal.dismiss()
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

   onUploadUp(e){
    // console.log('estas en la funcion', e.target.files[0])
 
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercentUp = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImageUp = ref.getDownloadURL())).subscribe();
 
    
   }


   async PublicarAction() {
    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todo correcto, publicar',
        role: 'destructive',
        icon: 'walk',
        handler: () => {
         this.publicar();
        }
      }  ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  async PublicarActionDestacado() {
    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Todo correcto, publicar',
        role: 'destructive',
        icon: 'walk',
        handler: () => {
         this.publicarDestacado();
        }
      }  ,{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



  async eliminarEditar(item) {
    const actionSheet = await this.action.create({
      header: 'Estas seguro?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.eliminarEpisodio(item)
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

  eliminarEpisodio(item){
    this.db.collection('episodios').doc(item.id).delete()
  }

  capituloNum(){
    let howLen:any = this.episodiosAll.filter(item => item.nombre === this.nombre)
    let hoow:any = howLen.filter(item => item.propio === true)

    this.capituloNro = hoow.length + 1
  }

  publicar(){
    switch(this.mesEstreno) {
      case '1':
        this.FullMonth = "Enero";
        this.monthNum = '01'
        break;
      case '2':
        this.FullMonth = "Febrero";
        this.monthNum = '02'
        break;
      case '3':
        this.FullMonth = "Marzo";
        this.monthNum = '03'
        break;
      case '4':
        this.FullMonth = "Abril";
        this.monthNum = '04'
        break;
      case '5':
        this.FullMonth = "Mayo";
        this.monthNum = '05'
        break;
      case '6':
        this.FullMonth = "Junio";
        this.monthNum = '06'
        break;
      case '7':
        this.FullMonth = "Julio";
        this.monthNum = '07'
        break;
      case '8':
          this.FullMonth = "Agosto";
          this.monthNum = '08'
          break; 
      case '9':
          this.FullMonth = "Septiembre";
          this.monthNum = '09'
          break; 
          
      case '10':
          this.FullMonth = "Octubre";
          this.monthNum = '10'
          break; 
      case '11':
          this.FullMonth = "Noviembre";
          this.monthNum = '11'
          break; 
          
      case '12':
          this.FullMonth = "Diciembre";
          this.monthNum = '12'
          break;
    }

    let endHourCode = this.mesEstreno +'/'+this.diaEstreno+ '/'+ this.year + ' '+ this.hora
    this.EpisodioLongDate = this.diaEstreno + ' de ' + this.FullMonth + ' de ' + this.year;
    this.EpisodioShortDate = this.dayOfTheWeek +' '+ this.diaEstreno +'/'+this.mesEstreno;
    let fechaFilter = this.monthNum+this.diaEstreno


    if(numeral(this.diaEstreno).value() >= 0 && numeral(this.diaEstreno).value()<10){
      this.FechaDate = this.monthNum + '0'+this.diaEstreno
    }else{
      this.FechaDate = this.monthNum+this.diaEstreno
    }


    this.db.collection('episodios').add({
      nombre:this.nombre,
      capitulo:this.capituloNro,
      link:this.link,
      categoria:this.categoria,
      horario:this.horario,
      descripcion:this.descripcion,
      cover:this.url,
      shortDate:this.EpisodioShortDate,
      longDate:this.EpisodioLongDate,
      day:this.dayOfTheWeek,
      destacado:this.destacado,
      endHour:endHourCode,
      semanaActiva:this.semanaIsActive,
      horaEnd:this.hora,
      pais:this.pais,
      propio:this.propio,
      fecha:this.FechaDate,
      ad:false

    }).then(item =>{
      this.db.collection('catepisodios').doc(this.categoria).set({
        name:this.categoria
      }).then(i=>{
        this.volverAll()
      })
    })
  }

  volverAll(){
    this.addEpisodioNormal = false
    this.addDestacado = false

    this.nombre = null
    this.capituloNro = null
    this.link = null
    this.categoria = null
    this.horario = null
    this.descripcion = null
    this.uploadPercent =null
    this.urlImage =null
    this.url = null
    this.EpisodioShortDate = null
    this.destacado= false
    this.hora = null
    this.pais = null
  }

  publicarDestacado(){
    switch(this.mesEstreno) {
      case '1':
        this.FullMonth = "Enero";
        this.monthNum = '01'
        break;
      case '2':
        this.FullMonth = "Febrero";
        this.monthNum = '02'
        break;
      case '3':
        this.FullMonth = "Marzo";
        this.monthNum = '03'
        break;
      case '4':
        this.FullMonth = "Abril";
        this.monthNum = '04'
        break;
      case '5':
        this.FullMonth = "Mayo";
        this.monthNum = '05'
        break;
      case '6':
        this.FullMonth = "Junio";
        this.monthNum = '06'
        break;
      case '7':
        this.FullMonth = "Julio";
        this.monthNum = '07'
        break;
      case '8':
          this.FullMonth = "Agosto";
          this.monthNum = '08'
          break; 
      case '9':
          this.FullMonth = "Septiembre";
          this.monthNum = '09'
          break; 
          
      case '10':
          this.FullMonth = "Octubre";
          this.monthNum = '10'
          break; 
      case '11':
          this.FullMonth = "Noviembre";
          this.monthNum = '11'
          break; 
          
      case '12':
          this.FullMonth = "Diciembre";
          this.monthNum = '12'
          break;
    }

    let endHourCode = this.mesEstreno +'/'+this.diaEstreno+ '/'+ this.year + ' '+ this.hora
    this.EpisodioLongDate = this.diaEstreno + ' de ' + this.FullMonth + ' de ' + this.year;
    this.EpisodioShortDate = this.dayOfTheWeek +' '+ this.diaEstreno +'/'+this.mesEstreno;
    let fechaFilter = this.monthNum+this.diaEstreno
    this.superShortDate = this.diaEstreno + ' de '+ this.FullMonth
    
    if(numeral(this.diaEstreno).value() >= 0 && numeral(this.diaEstreno).value()<10){
      this.FechaDate = this.monthNum + '0'+this.diaEstreno
    }else{
      this.FechaDate = this.monthNum+this.diaEstreno
    }

    this.db.collection('hipodromos').doc(this.hipodromoToUpdate[0].id).update({
      link : this.link,
      lastDay: this.superShortDate

    })


    this.db.collection('episodios').add({
      nombre:this.nombre,
      capitulo:this.capituloNro,
      link:this.link,
      categoria: 'Hipismo' ,
      horario:this.horario,
      descripcion:this.descripcion,
      cover:this.url,
      shortDate:this.EpisodioShortDate,
      longDate:this.EpisodioLongDate,
      day:this.dayOfTheWeek,
      destacado:true,
      endHour:endHourCode,
      semanaActiva:false,
      horaEnd:this.hora,
      pais:this.pais,
      propio:false,
      fecha:this.FechaDate,
      ad:false

    }).then(item =>{

        

      this.volverAll()
    })
  }


  editarPropio(item){
    this.editPropio = item
  }

  async presentActionSheet(item) {
    const actionSheet = await this.action.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Editar Episodio',
        icon: 'pencil',
        handler: () => {
          this.editarPropio(item)
        }
      } ,{
        text: 'Elimnar Episodio',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
         this.db.collection('episodios').doc(item.id).delete()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  async presentToast(nameOf) {
    const toast = await this.toast.create({
      message: nameOf + ' a sido actualizado correctamente.',
      duration: 3000,
      color:  'success'
    });
    toast.present();
  }

  //Update Funcion

  updateNombre(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      nombre : this.nombreUp
    }).then(()=>{
      this.nombreUp = null
      this.presentToast('El Nombre')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }

  updatePais(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      pais : this.paisUp
    }).then(()=>{
      this.paisUp = null
      this.presentToast('El Pais')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }

  updateLink(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      link : this.linkUp
    }).then(()=>{
      this.linkUp = null
      this.presentToast('El Link de Video')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }

  updateCategoria(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      categoria : this.categoriaUp
    }).then(()=>{
      this.categoriaUp = null
      this.presentToast('La Categoria')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }

  updateHorario(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      horario : this.horarioUp
    }).then(()=>{
      this.horarioUp = null
      this.presentToast('El Horario')

      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }


  updateHora(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      hora : this.horaUp
    }).then(()=>{
      this.horaUp = null
      this.presentToast('La Hora')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }


  updateDescripcion(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      descripcion : this.descripcionUp
    }).then(()=>{
      this.descripcionUp = null
      this.presentToast('La Descripcion')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }


  updateCover(){
    this.db.collection('episodios').doc(this.editPropio.id).update({
      cover : this.urlUp
    }).then(()=>{
      this.urlUp = null
      this.presentToast('El Cover')
      this.db.collection('episodios').doc(this.editPropio.id).valueChanges().subscribe(item => {
        this.editPropio = item
      })

    })
  }




}
