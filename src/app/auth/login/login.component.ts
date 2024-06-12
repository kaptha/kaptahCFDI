import { Component, OnInit } from '@angular/core';
import  { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Sweetalert } from '../../functions';

import { UsersModel } from '../../models/users.model';

import { UsersService  } from '../../services/users.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: UsersModel;
  rememberMe:boolean = false;

  constructor(private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private router: Router
                ){
      this.user = new UsersModel();
  }
  ngOnInit(): void {
    /*=============================================
    Validar acción de recordar credencial de correo
    =============================================*/
    if(localStorage.getItem("rememberMe") && localStorage.getItem("rememberMe") == "yes"){

      this.user.email = localStorage.getItem("email") || '';
      this.rememberMe = true;

    }
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
    /*=============================================
    Verificar cuenta de correo electrónico
    =============================================*/
    if(this.activatedRoute.snapshot.queryParams["oobCode"] != undefined &&
       this.activatedRoute.snapshot.queryParams["mode"] == "verifyEmail"){

      let body = {

        oobCode: this.activatedRoute.snapshot.queryParams["oobCode"]
      }

      this.usersService.confirmEmailVerificationFnc(body)
      .subscribe((resp: any)=>{

        if(resp["emailVerified"]){
          
          /*=============================================
              Actualizar Confirmación de correo en Database
          =============================================*/ 

              this.usersService.getFilterData("email", resp["email"])
              .subscribe((resp: any)=>{

                for(const i in resp){

                  let id = Object.keys(resp).toString();

                  let value = {

                    Confirm: true
                  }

                  this.usersService.patchData(id, value)
                  .subscribe((resp: any)=>{

                    if(resp["Confirm"]){

                      Sweetalert.fnc("success", "¡Correo confirmado, Ingresa Ahora!", "login")
                    }

                  })

                }

              })

        }

      }, err =>{

        if(err.error.error.message == "INVALID_OOB_CODE"){

          Sweetalert.fnc("error", "El correo ya ha sido confirmado", "login")  

        }

      
      })

    } 
    
  }
/*=============================================
    Envío del formulario
  =============================================*/
  onSubmit(f: NgForm ){      
    if(f.invalid ){
          return;
    }
    /*=============================================
    Alerta suave mientras se registra el usuario
  =============================================*/

  Sweetalert.fnc("Cargando", "Cargando...", null)
  /*=============================================
        Validar que el correo esté verificado
  =============================================*/
    this.usersService.getFilterData("email", this.user.email).subscribe((resp1: any)=>{
      for(const i in resp1){
        if(resp1[i].Confirm){
         
    /*=============================================
     Login en Firebase Authentication
    =============================================*/
          this.user.returnSecureToken = true;
          this.usersService.loginAuth(this.user)
            .subscribe((resp2: any)=>{
              /*=============================================
              Almacenar IdToken
              =============================================*/
                let id = Object.keys(resp1).toString();
                let value = {

                  idToken: resp2["idToken"]
                }
                this.usersService.patchData(id, value)
                .subscribe((resp3: any)=>{

                  if(resp3["idToken"] != ""){

                    //Sweetalert.fnc("close", null, null)
              
                  /*=============================================
                Almacenamos el Token de seguridad en el localstorage
                =============================================*/

                localStorage.setItem("idToken", resp3["idToken"]);

                /*=============================================
                Almacenamos el email en el localstorage
                =============================================*/

                localStorage.setItem("email", resp2["email"]);

                /*=============================================
                Almacenamos la fecha de expiración localstorage
                =============================================*/
                let today = new Date();
                today.setSeconds(resp2["expiresIn"]);
                localStorage.setItem("expiresIn", today.getTime().toString());
                /*=============================================
                Almacenamos recordar email en el localStorage
                =============================================*/
                if(this.rememberMe){

                  localStorage.setItem("rememberMe", "yes");
                
                }else{

                  localStorage.setItem("rememberMe", "no");
                }
                /*=============================================
                Redireccionar a perfil
                =============================================*/
                //window.open("dashboard", "_top");
                  //this.router.navigateByUrl("dashboard/perfil");                  
                  this.router.navigateByUrl('dashboard');                   

                  }

                })
            },err =>{

                Sweetalert.fnc("error", err.error.error.message, null)

              })
        }else{
              Sweetalert.fnc("error", "Necesita Confirmar su Correo", null)
        }
      }
    })    
  }
}
