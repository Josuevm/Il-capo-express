
import { Injectable } from '@angular/core';

/*
  Generated class for the ErrorHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorHandlerProvider {

  constructor() {
    
  }

  handleError(err){
    let errorMessage = null;
    switch (err) {
      case 'The email address is badly formatted.':
        errorMessage = 'Debe ingresar un correo válido'
        break;
      case 'The password is invalid or the user does not have a password.':
        errorMessage = 'La contraseña es inválida o el usuario no ha sido registrado'
      break;
      default:
        break;
    }
    return errorMessage;
  }

}
