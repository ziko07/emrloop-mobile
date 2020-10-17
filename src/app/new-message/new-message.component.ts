import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';

import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {File} from '@ionic-native/file/ngx';

import {GroupService} from '../../services/group.service';
import {MessageService} from '../../services/message.service';
import {HelperService} from '../../services/helper.service';

import {Message} from '../../models/message.model';

@Component({
    selector: 'app-new-message',
    templateUrl: './new-message.component.html',
    styleUrls: ['../new-loop/new-loop.component.scss'],
})
export class NewMessageComponent implements OnInit {

    constructor(public router: Router,
                public groupService: GroupService,
                public messageService: MessageService,
                public helperService: HelperService,
                private fileChooser: FileChooser,
                private file: File) {
    }

    message = new Message();
    formData = new FormData();

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Write your message...',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
            [
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'justifyFull',
                'indent',
                'outdent',
                'insertUnorderedList',
                'insertOrderedList',
                'fontName'
            ],
            [
                'fontSize',
                'textColor',
                'backgroundColor',
                'customClasses',
                'link',
                'unlink',
                'insertImage',
                'insertVideo',
                'insertHorizontalRule',
                'removeFormat',
                'toggleEditorMode'
            ]
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };

    ngOnInit() {
    }

    public uploadFile(e): void {
        const file = e.target.files[0];
        this.formData.append('attachment', file, file.name);
    }

    onSendMessage() {
        for (const key in this.message) {
            if (key) {
                this.formData.append(key, this.message[key].trim());
            }
        }
        console.log(this.message);
        this.helperService.showLoader();
        this.messageService.sendMessage(this.formData).subscribe(
            resp => {
                console.log('Resp');
                this.helperService.dismissLoader();
                if (resp.status === 'ok') {
                    this.helperService.showSuccessToast('Message sent successfully.');
                    this.router.navigateByUrl('/inbox');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
                console.log(resp);
            }, err => {
                console.log('Err');
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something is wrong. Please try again later.');
            }
        );
        this.formData = null;
    }
}
