import { Component, OnInit } from '@angular/core';
import {
   AbstractControl,
   FormBuilder,
   FormGroup,
   ValidatorFn,
   Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-register-modal',
   templateUrl: './register-modal.component.html',
   styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
   visibleRegister = false;
   registerForm: FormGroup = new FormGroup({});
   validationErrors: string[] | undefined;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private notification: NotificationsService,
      private fb: FormBuilder
   ) {}

   ngOnInit(): void {
      this.initializeForm();
   }

   initializeForm() {
      this.registerForm = this.fb.group({
         username: ['', Validators.required],
         knownAs: ['', Validators.required],
         city: ['', Validators.required],
         country: ['', Validators.required],
         password: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(12),
            ],
         ],
         confirmPassword: [
            '',
            [Validators.required, this.matchValues('password')],
         ],
      });

      // por si cambia el password despues de poner el confirmPassword y pasar la validacion
      this.registerForm.controls['password'].valueChanges.subscribe(() => {
         this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      });
   }

   matchValues(matchTo: string): ValidatorFn {
      return (control: AbstractControl) => {
         return control.value === control.parent?.get(matchTo)?.value
            ? null
            : { notMatching: true };
      };
   }

   register() {
      // this.visibleRegister = false;

      this.accountService.register(this.registerForm.value).subscribe({
         next: () => {
            this.router.navigateByUrl('/miembros');

            this.notification.addNoti({
               severity: 'success',
               summary: 'Bienvenido.',
               detail: 'Que bueno tenerte.',
            });
         },
         error: (error) => {
            console.log(error);

            // los errores q vienen del interceptor
            this.validationErrors = error;

            // this.notification.addNoti({
            //    severity: 'error',
            //    summary: 'Error al entrar.',
            //    detail: error.error,
            // });
         },
      });
   }

   // abre el modal
   openRegister() {
      this.visibleRegister = !this.visibleRegister;
   }
}
