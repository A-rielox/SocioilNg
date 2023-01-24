import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'separate',
})
export class SeparatePipe implements PipeTransform {
   transform(value: string) {
      // let newValue = value.split(',').join(' - ');

      return value.split(',').join(' - ');
   }
}
