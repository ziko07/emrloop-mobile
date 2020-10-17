import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';

import {Message} from '../../models/message.model';

import {GroupService} from '../../services/group.service';
import {MessageService} from '../../services/message.service';
import {HelperService} from '../../services/helper.service';

@Component({
    selector: 'app-new-loop',
    templateUrl: './new-loop.component.html',
    styleUrls: ['./new-loop.component.scss'],
})
export class NewLoopComponent implements OnInit {

    constructor(public router: Router,
                public groupService: GroupService,
                public messageService: MessageService,
                public helperService: HelperService,
                public http: HttpClient) {
    }

    message = new Message();
    groups = [];
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
        this.onGetAllGroups();
    }

    private onGetAllGroups(): void {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.groups = resp[0].groups;
                console.log(this.groups);
            }
        );
    }

    public uploadFile(e): void {
        const file = e.target.files[0];
        this.formData.append('attachment', file, file.name);
    }

    public onLaunchLoop(): void {
        console.log(this.message);
        for (const key in this.message) {
            if (key) {
                this.formData.append(key, this.message[key]);
            }
        }
        this.helperService.showLoader();
        this.messageService.createNewLoop(this.formData).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp.message);
                if (resp.status === 'ok') {
                    this.messageService.listMessage(resp.message);
                    this.helperService.showSuccessToast('Loop created successfully!');
                    this.resetLoop();
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
    }

    public resetLoop() {
        this.message.group_id = null;
        this.message.receipt_type = '';
        this.message.title = '';
        this.message.content = '';
        this.message.attachment = null;
    }
}
