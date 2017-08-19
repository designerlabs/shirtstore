import { Pipe, PipeTransform } from '@angular/core';
declare var _: any;

@Pipe({
  name: 'uniqFilter',
  pure: false
})

export class UniquePipe implements PipeTransform {
  transform(items: any[], args: any[]): any {

        // lodash uniqBy function
        return _.uniqBy(items, args);
    }
}