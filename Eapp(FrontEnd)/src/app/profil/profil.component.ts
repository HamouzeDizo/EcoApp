// profil.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";
import {ClientService} from "../client.service";
import {Client} from "../Model/Client";
import {FakeClient} from "../Model/FakeClient";
import {LoginServiceService} from "../login-service.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profileForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  passwordsMatch = true;
  hasChanges = false;
  onlyEmailChanged = false;
  tempClient=this.authService.getUserDetails();
  constructor(private loginService:LoginServiceService, private formBuilder: FormBuilder, private authService: AuthService, private clientService:ClientService) {}
    private userDetails:Client=this.authService.getUserDetails();
  ngOnInit(): void {
    this.authService.fromP=false;
    // Call the authService to get user details
      this.loginService.getById(this.authService.getUserDetails().id)
      console.log(this.userDetails)
    // Initialize the form with user data
    this.profileForm = this.formBuilder.group({
      nom: [this.userDetails?.nom || '', Validators.required],
      prenom: [this.userDetails?.prenom || '', Validators.required],
      age: [this.userDetails?.age || '', Validators.required],
      email: [this.userDetails?.email || '', [Validators.required, Validators.email]],
      password: [this.userDetails?.password, [Validators.required]],
      passwordCon: [this.userDetails?.password, [Validators.required]]
    });

    // Subscribe to value changes in password and passwordCon fields to check if they match
    this.profileForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });

    this.profileForm.get('passwordCon')?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.hasChanges = !this.profileForm.pristine && this.isFieldOtherThanEmailChanged();

      if (this.hasChanges) {
        if (this.onlyEmailChanged) {
          console.log("Only email changed");
        } else {
          console.log("Other fields changed");
        }
      }
    });
  }

  updateProfile(): void {
    if (this.profileForm.value.age<13){
      window.alert("You have to be older than 13")
      return;
    }
    if (this.profileForm.value.password.length<8){
      window.alert("Password must be 8 characters or more");
      return
    }
    if ((this.profileForm.valid && !this.showConfirmPassword)||(this.profileForm.valid && this.passwordsMatch)) {
      if ((this.profileForm.value.email!=this.authService.getUserDetails().email && (this.profileForm.value.nom==this.authService.getUserDetails().nom ||
        this.profileForm.value.prenom==this.authService.getUserDetails().prenom ||
        this.profileForm.value.age==this.authService.getUserDetails().age ||
        this.profileForm.value.password==this.authService.getUserDetails().password))||
        (this.profileForm.value.email!=this.authService.getUserDetails().email && (this.profileForm.value.nom!=this.authService.getUserDetails().nom ||
          this.profileForm.value.prenom!=this.authService.getUserDetails().prenom ||
          this.profileForm.value.age!=this.authService.getUserDetails().age ||
          this.profileForm.value.password!=this.authService.getUserDetails().password))){
        this.loginService.checkEmail(this.profileForm.value.email).subscribe(success => {
          if (success) {
            window.alert("The Email you have enter already exists. Please choose another Email")
            return;
          }
          else {
            const client = new FakeClient(
              this.authService.getUserDetails().id,
              this.profileForm.value.nom,
              this.profileForm.value.prenom,
              this.profileForm.value.age,
              this.profileForm.value.email,
              this.profileForm.value.password
            );
            this.clientService.updateClient(client);
            this.tempClient=client;
            this.updateFormWithUserDetails();
              this.authService.logout()
              this.authService.fromP=true;
          }});
      }
      if (this.profileForm.value.email==this.authService.getUserDetails().email && (this.profileForm.value.nom!=this.authService.getUserDetails().nom ||
        this.profileForm.value.prenom!=this.authService.getUserDetails().prenom ||
        this.profileForm.value.age!=this.authService.getUserDetails().age ||
        this.profileForm.value.password!=this.authService.getUserDetails().password)){
        const client = new FakeClient(
          this.authService.getUserDetails().id,
          this.profileForm.value.nom,
          this.profileForm.value.prenom,
          this.profileForm.value.age,
          this.profileForm.value.email,
          this.profileForm.value.password
        );
        this.clientService.updateClient(client);
        this.authService.logout()
        this.tempClient=client;
        this.updateFormWithUserDetails();
          this.authService.fromP=true;
      }


    }
    else {console.log("something is wrong")}
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  changePassword(): void {
    if (this.showConfirmPassword) {
      this.showConfirmPassword = false;
      // Show the old password as dots
      this.profileForm.get('password')?.setValue(this.authService.getUserDetails().password);
      this.profileForm.get('passwordCon')?.setValue(this.authService.getUserDetails().password);
    } else {
      this.showConfirmPassword = true;
      // Clear the password field
      this.profileForm.get('password')?.setValue('');
      // Clear the passwordCon field
      this.profileForm.get('passwordCon')?.setValue('');
      // Reset the passwordsMatch variable
      this.passwordsMatch = true;
    }
  }

  isFieldOtherThanEmailChanged(): boolean {
    const formControls = this.profileForm.controls;

    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName) && controlName !== 'email') {
        const control = formControls[controlName];
        // Check if the control is changed
        if (!control.pristine) {
          return true;
        }
      }
    }

    const emailControl = formControls['email'];
    this.onlyEmailChanged = !emailControl.pristine;

    return this.onlyEmailChanged;
  }




  checkPasswordsMatch(): void {
    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('passwordCon')?.value;
    this.passwordsMatch = password === confirmPassword;

    if (this.passwordsMatch) {
      this.profileForm.get('passwordCon')?.setErrors(null);
    } else {
      this.profileForm.get('passwordCon')?.setErrors({ mismatch: true });
    }
  }
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticatedUser();
  }

  isAnyFieldEmpty(): boolean {
    const formControls = this.profileForm.controls;

    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName)) {
        const control = formControls[controlName];
        // Check if the control is empty and has been touched
        if ((control.invalid && control.touched)) {
          return true;
        }
      }
    }

    return false;
  }
    updateFormWithUserDetails() {
        this.profileForm.patchValue({
            nom: this.userDetails?.nom || '',
            prenom: this.userDetails?.prenom || '',
            age: this.userDetails?.age || '',
            email: this.userDetails?.email || '',
            password: this.userDetails?.password || '',
            passwordCon: this.userDetails?.password || '',
        });
    }

  deleteAccount(): void {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      this.clientService.deleteClient(this.authService.getUserDetails().email);
      this.authService.logout();
    } else {
      console.log("Account deletion canceled");
    }
  }

}
