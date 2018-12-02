import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  confirm_password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      access_level: 1 // 0 = unverified user, 1 = normal verified user, 2 = admin
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 })
      return false;
    }

    // Match password and confirm_password
    if (user.password != user.confirm_password) {
      this.flashMessagesService.show('Passwords do not match', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 })
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Email is not valid', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 })
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessagesService.show('You are registered successfully', { cssClass: 'alert alert-dismissible alert-success', timeout: 1000 })
        this.router.navigate(['/login']);
      } else {
        if (data.msg != undefined) {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 });
        } else {
          this.flashMessagesService.show('Something went wrong', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 });
        }
        this.router.navigate(['/register']);
      }
    });
  }

}
