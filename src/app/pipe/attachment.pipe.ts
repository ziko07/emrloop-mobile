import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'attachment', pure: false
})
export class AttachmentPipe implements PipeTransform {
    imageType = ['png', 'jpeg', 'gif', 'jpg', ''];

    constructor(protected sanitizer: DomSanitizer) {
    }

    transform(value: any): any {
        return this.attachmentType(value);
    }

    attachmentType(value) {
        let file_url = value.split('?')[0];
        let ext = file_url.split('.').pop();
        if (this.imageType.includes(ext)) {
            return this.imagePreview(value);
        } else if (ext === 'MOV') {
            return this.videoPreview(value);
        } else if (ext === 'pdf') {
            return this.pdfPreview(value);
        } else {
            return '';
        }
    }

    imagePreview(url) {
        const img = '<img src=\'' + url + '\' class=\'preview-image\'/>';
        return this.sanitizer.bypassSecurityTrustHtml(img);
    }

    videoPreview(url) {
        let video = '<div class=\'video\'>';
        video += '<video controls (click)=\'toggleVideo(event)\'>';
        video += '<source src=\'' + url + '\' type=\'video/mp4\'>';
        video += 'Browser not supported';
        video += '</video>';
        video += '</div>';
        return this.sanitizer.bypassSecurityTrustHtml(video);
    }

    pdfPreview(url) {
        const pdf = '<iframe style="min-height: 450px" src=\'' + url + '\' width=\'100%\' height=\'100%\'></iframe>';
        return this.sanitizer.bypassSecurityTrustHtml(pdf);
    }
}
