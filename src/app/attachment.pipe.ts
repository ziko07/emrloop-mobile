import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attachment', pure: false
})
export class AttachmentPipe implements PipeTransform {

  transform(value: any): any {
    return 'test';
  }

}
