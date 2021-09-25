import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { TriviaService } from 'src/app/servicios/trivia.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
})
export class EncuestasComponent implements OnInit {

  public encuestas : any;
  public encuestaData : any;
  public isSelected: string;
  public seleccion : boolean;
  public select:any;
  public log : boolean;
  public userAny : any;

  constructor(public modal : ModalController, public app : TriviaService, public db : AngularFirestore, 
              public afAuth : AngularFireAuth, public auth : AuthService) { }

  ngOnInit() {
  
  }

  ionViewDidEnter(){

    this.log = false
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
          this.userAny = item;
        })
       }
      })
    this.app.getEncuesta().subscribe(item =>{
     
      this.encuestas = item
    })
  }

  emailLogin(correo, contra){
    this.auth.loginUser(correo.value, contra.value).then(()=>{
      
      this.afAuth.onAuthStateChanged((user)=>{
        if(user){
          this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
            this.userAny = item;
            
          })
         }
        })
        
    })
  }


  cerrarModal(){
    this.modal.dismiss()
  }

  addEncuestaData(item){
    this.encuestaData = item
  }
  userSelect(item){
    if(item.isChecked === true){
      for(let item of this.encuestaData.data){
        item.isChecked = false
      }
      item.isChecked = true
      this.isSelected =' '
      this.select = item
      console.log(this.select)
    }else{
      this.select = null
      console.log(this.select)
    }
   
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
                     
   }


  addEncuesta(){
    this.db.collection('encuestas').doc(this.encuestaData.id).collection('participantes').doc(this.userAny.uid).set({
      name:this.select.name,
      userName:this.userAny.displayName,
      userUid:this.userAny.uid
    }).then(i=>{
      this.encuestaData = null
    })
  }
/*
  async onLoginGoogle(){
    try{
      this.auth.loginAndroidGoogle().then(i=>{

        this.afAuth.onAuthStateChanged((user)=>{
          if(user){
            this.db.collection('users').doc(user.uid).valueChanges().subscribe(item=>{
              this.userAny = item;
            })

           }else{

           }
          }


        )
      })

     
    }
    catch(error){console.log(error)}
  }

*/
}  
  