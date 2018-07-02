
import { Injectable } from '@angular/core';

/*
  This provider has methods to return messages for the different errors related with
  logins, register and update user information.
*/
@Injectable()
export class ErrorHandlerProvider {

  constructor() {

  }

  /*
    Depending of the received message (That is automatically generated from firebase), this methods translate that message to spanish.
  */
  handleError(err) {
    let errorMessage = null;
    switch (err) {
      case 'The email address is badly formatted.':
        errorMessage = 'Debe ingresar un correo válido'
        break;
      case 'The password is invalid or the user does not have a password.':
        errorMessage = 'La contraseña es inválida o el usuario no ha sido registrado'
        break;
      case 'Password should be at least 6 characters':
        errorMessage = 'Contraseña debe tener más de 6 caracteres';
        break;
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
        errorMessage = 'El usuario no está registrado';
        break;
      case 'The email address is already in use by another account.':
        errorMessage = 'Este correo ya se encuentra registrado';
        break;
      default:
        break;
    }
    return errorMessage;
  }

  /*
    Receives an object and validates if it has null or empty values.
   */
  checkProperties(obj) {
    for (var key in obj) {
      console.log(obj[key])
      if (obj[key] === null || obj[key] == "")
        return false;
    }
    return true;
  }

}
