import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { Client } from '../Model/Client';
import {AuthService} from "../auth.service";
import {LoginServiceService} from "../login-service.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  clientForm: FormGroup;
  clicked=false;

  constructor(private loginService:LoginServiceService, private clientService: ClientService, private router: Router, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: [undefined, Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],  // Add custom emailValidator
      password: ['', Validators.required]
    });
  }

  saveClient() {
    const email = this.clientForm.value.email;
    const password = this.clientForm.value.password;
    if (this.clientForm.value.age<13){
      window.alert("You have to be older than 13")
      return;
    }
    if (this.clientForm.value.password.length<8){
      window.alert("Password must be 8 characters or more");
      return
    }
    this.loginService.checkEmail(email).subscribe(success => {
      if (success) {
        window.alert("The Email you have enter already exists. Please choose another Email")
      }
      else {
        this.clientService.createClient(this.clientForm.value);
        this.clicked=true;
      }
    });

  }

  onSubmit() {
    this.saveClient();
  }

  // Custom email validator
  private emailValidator(control: any): { [key: string]: boolean } | null {
    const email = control.value;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      return { 'invalidEmail': true };
    }

    return null;
  }
}
