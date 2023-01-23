import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'separate',
})
export class SeparatePipe implements PipeTransform {
   transform(value: string) {
      // if (value.length > limit) {
      //    return value.substring(0, limit) + '...';
      // }
      let newValue = value.split(',').join(' - ');

      console.log('----', newValue);

      return newValue;
   }
}
