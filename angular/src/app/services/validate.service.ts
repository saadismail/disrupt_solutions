import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    console.log(user);
    if (user.f_name == undefined || user.l_name == undefined || user.email == undefined || user.password == undefined || user.confirm_password == undefined) {
      return false;
    }

    return true;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateLogin(user) {
    return (user.email != undefined && user.password != undefined);
  }
}
