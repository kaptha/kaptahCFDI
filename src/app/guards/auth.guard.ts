import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private usersService: UsersService,
         private router: Router){}
  
  canActivate(): Promise<boolean> {
    
    return new Promise((resolve, reject) =>{

      this.usersService.authActivate().then((resp: any) =>{

        if(!resp){
          //console.log('Redirecting to login');
          this.router.navigateByUrl("/login");
          resolve(false);
                            
        }else{

          resolve(true)
        }

      }).catch(error => {
        //console.error('Error during authentication:', error);
        this.router.navigateByUrl("/login");
        resolve(false);
      });

    })
  
  }
  
}
