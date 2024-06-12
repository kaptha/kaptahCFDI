import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  Api, 
          Register, 
          Login, 
          SendEmailVerification, 
          ConfirmEmailVerification, 
          GetUserData, 
          SendPasswordResetEmail,
          VerifyPasswordResetCode,
          ConfirmPasswordReset } from '../config';

import { UsersModel } from '../models/users.model';

declare var jQuery:any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api:string = Api.url;
  private register:string = Register.url;
  private login:string = Login.url;
  private sendEmailVerification:string = SendEmailVerification.url;
  private confirmEmailVerification:string = ConfirmEmailVerification.url;
  private getUserData:string = GetUserData.url;
  private sendPasswordResetEmail:string = SendPasswordResetEmail.url;
  private verifyPasswordResetCode:string = VerifyPasswordResetCode.url;
  private confirmPasswordReset:string = ConfirmPasswordReset.url;

  constructor(private http:HttpClient) { }
  /*=============================================
  Registro en Firebase Authentication
  =============================================*/
  
  registerAuth(user: UsersModel){

    return this.http.post(`${this.register}`, user);

  }
  /*=============================================
    Login en Firebase Authentication
  =============================================*/
  
    loginAuth(user: UsersModel){

      return this.http.post(`${this.login}`, user);

    }  
  /*=============================================
    Enviar verificación de correo electrónico
  =============================================*/

    sendEmailVerificationFnc(body:object){

      return this.http.post(`${this.sendEmailVerification}`, body);

    }

  /*=============================================
    Confirmar email de verificación
  =============================================*/

    confirmEmailVerificationFnc(body:object){

      return this.http.post(`${this.confirmEmailVerification}`, body);

    }
  /*=============================================
    Actualizar data de usuario
  =============================================*/

    patchData(id:string, value:object){

    return this.http.patch(`${this.api}usuarios/${id}.json`,value);

  }
  /*=============================================
  Registro en Firebase Database
  =============================================*/
  registerDatabase(user: UsersModel){
    
    delete user.password;
    //delete user.returnSecureToken;

    return this.http.post(`${this.api}/usuarios.json`, user);

  }  
  /*=============================================
    Filtrar para buscar coincidencias RFC
  =============================================*/
    getFilterData(orderBy:string, equalTo:string){

      return this.http.get(`${this.api}usuarios.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);

    }
  /*=============================================
    Validar idToken de Autenticación
  =============================================*/
  authActivate(){ 

      return new Promise(resolve=>{

      /*=============================================
        Validamos que el idToken sea real
        =============================================*/
        if(localStorage.getItem("idToken")){

          let body = {

            idToken: localStorage.getItem("idToken") 
          }
      
        this.http.post(`${this.getUserData}`, body)
        .subscribe((resp: any)=>{  

          /*=============================================
            Validamos fecha de expiración
            =============================================*/
            if(localStorage.getItem("expiresIn")){

              let expiresIn = Number(localStorage.getItem("expiresIn"));

              let expiresDate = new Date();
              expiresDate.setTime(expiresIn);

              if(expiresDate > new Date()){

                resolve(true)
              
              }else{

                localStorage.removeItem('idToken');
                  localStorage.removeItem('expiresIn');
                resolve(false)
              }

            }else{

              localStorage.removeItem('idToken');
              localStorage.removeItem('expiresIn');
              resolve(false)
            
            }


        },err =>{
          
          localStorage.removeItem('idToken');
          localStorage.removeItem('expiresIn');
          resolve(false)

        })

      }else{

        localStorage.removeItem('idToken');
            localStorage.removeItem('expiresIn');   
        resolve(false)  
      }

    })  

    }
    /*=============================================
    Resetear la contraseña
    =============================================*/
    sendPasswordResetEmailFnc(body:object){

      return this.http.post(`${this.sendPasswordResetEmail}`, body)

    }
    /*=============================================
    Confirmar el cambio de la contraseña
    =============================================*/
    verifyPasswordResetCodeFnc(body:object){

      return this.http.post(`${this.verifyPasswordResetCode}`, body)

    }
    /*=============================================
    Enviar la contraseña
    =============================================*/
    confirmPasswordResetFnc(body:object){

      return this.http.post(`${this.confirmPasswordReset}`, body)

    }
}
