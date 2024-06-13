import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

import { toUpperCase, Sweetalert } from '../../functions';
import { UsersModel } from '../../models/users.model';
import { UsersService } from '../../services/users.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: UsersModel;
  constructor (private usersService: UsersService){
    this.user = new UsersModel();
  }

  ngOnInit(): void {
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event: Event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
  }
    /*=============================================
    Convertir a mayusculas
    =============================================*/
  onInputChange(event: any): void {
    event.target.value = toUpperCase(event.target.value);
  }
  /*=============================================
  Validación de expresión regular del formulario
  =============================================*/
  validate(input: HTMLInputElement){
    let pattern = /^[A-Za-z]{2,8}$/;

    if($(input).attr("name") == "rfc"){

      pattern = /^[A-Za-z]{2,8}$/;

      this.usersService.getFilterData("rfc", input.value).subscribe(resp => {
        if(Object.keys(resp).length > 0){

          $(input).parent().addClass('was-validated')
            input.value = "";
            Sweetalert.fnc("error", "RFC ya existe", null)         
        }
      })
    }

    if($(input).attr("name") == "password"){
      pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    }
    if(!pattern.test(input.value)){     
            
      $(input).parent().addClass('was-validated')
      //input.value = "";
    
    }
  }

  OnSubmit(f: NgForm){
    if(f.invalid ){

      return;

    }
    /*=============================================
    Registro en Firebase Authentication
    =============================================*/
    this.user.returnSecureToken = true;
    
    this.usersService.registerAuth(this.user).subscribe((resp: any) =>{
      //console.log("resp", resp);
      if(resp["email"] == this.user.email){
    /*=============================================
        Enviar correo de verificación
    =============================================*/
        let body = {
          requestType: "VERIFY_EMAIL",
          idToken: resp["idToken"]        
        }
        this.usersService.sendEmailVerificationFnc(body).subscribe((resp: any) => {
          if(resp["email"] == this.user.email){

            /*=============================================
            Registro en Firebase Database
            =============================================*/
          
            this.user.Confirm = false;
                 
            this.usersService.registerDatabase(this.user)
            .subscribe((resp: any)=>{
              
               Sweetalert.fnc("success", "Cuenta creada, confirma tu correo para acceder (revisa spam)", "login")

            })

          }
        })   
        
    
      }
    }, err=>{
      Sweetalert.fnc("error", err.error.error.message, null)
    })
  }
  /*=============================================
  Registro con Facebook
  =============================================*/
  facebookRegister(){
    let localUsersService = this.usersService;
    let localUser = this.user;

    const firebaseConfig = {
      apiKey: "AIzaSyBo8MXnWkR0b5gMN_UqMKWDhK6JZef2bFA",
      authDomain: "kaptah-cfdi.firebaseapp.com",
      databaseURL: "https://kaptah-cfdi-default-rtdb.firebaseio.com",
      projectId: "kaptah-cfdi",
      storageBucket: "kaptah-cfdi.appspot.com",
      messagingSenderId: "1059319958995",
      appId: "1:1059319958995:web:4d160f2d9270cd6b42b326",
      measurementId: "G-J59N81X5DF"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    /*=============================================
    Crea una instancia del objeto proveedor de Facebook
    =============================================*/
    var provider = new FacebookAuthProvider();
    /*=============================================
    acceder con una ventana emergente y con certificado SSL (https)
    =============================================*/
    //ng serve --ssl true --ssl-cert "/path/to/file.crt" --ssl-key "/path/to/file.key"
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
    // The signed-in user info.
    const user = result.user;    
    const credential = FacebookAuthProvider.credentialFromResult(result);
    
   
    })
    .catch((error) => {
        
    const errorMessage = error.message;
    
    Sweetalert.fnc("error", errorMessage, "register");
    
    });
    function registerFirebaseDatabase(result: any, localUser: any, localUsersService: any){
      var user = result.user; 
     
      if(user.P){
     
        localUser.displayName = user.displayName;
        localUser.email = user.email;
        localUser.idToken = user.b.b.g;
        localUser.method = "facebook";        
        localUser.picture = user.photoURL;
  
        /*=============================================
        Evitar que se dupliquen los registros en Firebase Database
        =============================================*/

        localUsersService.getFilterData("email", user.email)
        .subscribe((resp: any)=>{
          if(Object.keys(resp).length > 0){
            Sweetalert.fnc("error", `Ya has iniciado sesión, inicia sesión con el método ${resp[Object.keys(resp)[0]].method}`, "login")

          }else{

            localUsersService.registerDatabase(localUser)
            .subscribe((resp: any)=>{
              if(resp["name"] != ""){
                Sweetalert.fnc("success", "Por favor inicia sesion con facebook", "login");
              } 

            })

          }

        })

      }
    }
  }
  /*=============================================
  Registro con Google
  =============================================*/
  googleRegister(){
    let localUsersService = this.usersService;
    let localUser = this.user;

    const firebaseConfig = {
      apiKey: "AIzaSyBo8MXnWkR0b5gMN_UqMKWDhK6JZef2bFA",
      authDomain: "kaptah-cfdi.firebaseapp.com",
      databaseURL: "https://kaptah-cfdi-default-rtdb.firebaseio.com",
      projectId: "kaptah-cfdi",
      storageBucket: "kaptah-cfdi.appspot.com",
      messagingSenderId: "1059319958995",
      appId: "1:1059319958995:web:4d160f2d9270cd6b42b326",
      measurementId: "G-J59N81X5DF"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    /*=============================================
    Crea una instancia del objeto proveedor de Google
    =============================================*/
    const provider = new GoogleAuthProvider();
    /*=============================================
    acceder con una ventana emergente 
    =============================================*/
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result: any) => {
    // The signed-in user info.
    const user = result.user;    
    const credential = GoogleAuthProvider.credentialFromResult(result);    
   
    })
    .catch((error: any) => {
        
    const errorMessage = error.message;    
    Sweetalert.fnc("error", errorMessage, "register");
    
    });
    /*=============================================
    Registramos al usuario en Firebase Database
    =============================================*/
    function registerFirebaseDatabase(result: any, localUser: any, localUsersService: any){
      var user = result.user; 
     
      if(user.P){
     
        localUser.displayName = user.displayName;
        localUser.email = user.email;
        localUser.idToken = user.b.b.g;
        localUser.method = "google";        
        localUser.picture = user.photoURL;
  
        /*=============================================
        Evitar que se dupliquen los registros en Firebase Database
        =============================================*/

        localUsersService.getFilterData("email", user.email)
        .subscribe((resp: any)=>{

          if(Object.keys(resp).length > 0){
            Sweetalert.fnc("error", `Ya has iniciado sesión, inicia sesión con el método ${resp[Object.keys(resp)[0]].method} `, "login")
          }else{
            localUsersService.registerDatabase(localUser)
            .subscribe((resp: any)=>{

              if(resp["name"] != ""){
                Sweetalert.fnc("success", "Por favor ingresa con google", "login");
              } 

            })

          }

        })

      }

    }
  }
}
