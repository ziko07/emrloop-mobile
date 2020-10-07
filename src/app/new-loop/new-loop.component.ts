import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';

import { EmailComposer } from '@ionic-native/email-composer/ngx';


import {GroupService} from '../../services/group.service';
import {MessageService} from '../../services/message.service';
import {HelperService} from '../../services/helper.service';

import {Message} from '../../models/message.model';

@Component({
    selector: 'app-new-loop',
    templateUrl: './new-loop.component.html',
    styleUrls: ['./new-loop.component.scss'],
})
export class NewLoopComponent implements OnInit {

    constructor(public router: Router,
                public groupService: GroupService,
                public messageService: MessageService,
                public helperService: HelperService) {
    }

    groups = [];
    message = new Message();

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Write some content...',
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
        this.onGetAllGroups();

    }

    onGetAllGroups(): void {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.groups = resp[0].groups;
                console.log(this.groups);
            }
        );
    }

    loadFileFromDevice(e): void {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.message.attachment = reader.result;
        };
    }

    onLaunchLoop(): void {
        console.log(this.message);
        this.helperService.showLoader();
        this.messageService.createNewLoop(this.message).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp);
                if (resp.status === 'ok') {
                    this.messageService.listMessage(resp);
                    this.helperService.showSuccessToast('Loop created successfully!');
                    this.router.navigateByUrl('/inbox');
                } else {
                    this.helperService.showDangerToast(resp.message);
                }
            }, err => {
                this.helperService.dismissLoader();
                this.helperService.showDangerToast('Something is wrong. Please try again later.');
                console.log(err);
            }
        );
        this.message.title = '';
        this.message.content = '';
    }
}
