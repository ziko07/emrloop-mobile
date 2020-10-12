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
    selector: 'app-new-loop',
    templateUrl: './new-loop.component.html',
    styleUrls: ['./new-loop.component.scss'],
})
export class NewLoopComponent implements OnInit {

    constructor(public router: Router,
                public groupService: GroupService,
                public messageService: MessageService,
                public helperService: HelperService,
                private fileChooser: FileChooser,
                private file: File) {
    }

    groups = [];
    message = new Message();
    uploadText: any;
    downloadFile: any;

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

    private onGetAllGroups(): void {
        this.groupService.getAllInfo().subscribe(
            resp => {
                this.groups = resp[0].groups;
                console.log(this.groups);
            }
        );
    }

    public uploadFile(): void {
        this.fileChooser.open().then(uri => {
                alert(uri);
                this.file.resolveLocalFilesystemUrl(uri).then((newUrl) => {
                    alert(JSON.stringify(newUrl));

                    let dirPath = newUrl.nativeURL;
                    const dirPathSegments = dirPath.split('/');
                    dirPathSegments.pop();
                    dirPath = dirPathSegments.join('/');
                    this.message.attachment = dirPath;

                    // this.file.readAsArrayBuffer(dirPath, newUrl.name).then((buffer) => {
                    //     this.upload(buffer, newUrl.name);
                    // });
                });
            })
            .catch(err => alert(JSON.stringify(err)));
    }

    public onLaunchLoop(): void {
        // this.uploadFile();
        console.log(this.message);
        this.helperService.showLoader();
        this.messageService.createNewLoop(this.message).subscribe(
            resp => {
                this.helperService.dismissLoader();
                console.log(resp.message);
                if (resp.status === 'ok') {
                    this.messageService.listMessage(resp.message);
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
