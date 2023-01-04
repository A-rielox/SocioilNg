import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-server-error',
   templateUrl: './server-error.component.html',
   styleUrls: ['./server-error.component.css'],
})
export class ServerErrorComponent implements OnInit {
   error: any;

   // SOLO SE PUEDE ACCEDER A LOS RUTER-STATES DENTRO DEL CONSTRUCTOR
   constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();

      this.error = navigation?.extras?.state?.['error'];
   }

   ngOnInit(): void {}
}

/*       LA INFO Q MANDO DESDE EL INTERCEPTOR

   case 500:
      // p' mandar la info al componente al q redirecciono
      const navigationExtras: NavigationExtras = {
         state: { error: error.error },
      };

      this.router.navigateByUrl(
         '/server-error',
         navigationExtras
      );

      break;

*/
