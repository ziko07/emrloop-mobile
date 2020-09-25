import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Platform} from '@ionic/angular';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

import {AuthService} from '../services/auth.service';
import {HelperService} from '../services/helper.service';
import {AuthGuardService as AuthGuard} from '../services/auth/auth-guard.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    isSignedIn: boolean;
    navigate: any;
    user: any;
    token: any = "Init";
    status: any = 'init';
    adminMenu = [
        {
            title: 'My Profile',
            url: '/profile',
            icon: 'information-circle-outline'
        },
        {
            title: 'To Do',
            url: '/home',
            icon: 'list'
        },
        {
            title: 'History',
            url: '/history',
            icon: 'briefcase'
        },
        {
            title: 'Users',
            url: '/users',
            icon: 'person-circle-outline'
        },
        {
            title: 'Groups',
            url: '/groups',
            icon: 'people-outline'
        },
        {
            title: 'Clients',
            url: '/clients',
            icon: 'people-circle-outline'
        },
        {
            title: 'Logos',
            url: '/logos',
            icon: 'aperture-outline'
        }
    ];
    generalMenu = [
        {
            title: 'My Profile',
            url: '/profile',
            icon: 'information-circle-outline'
        },
        {
            title: 'To Do',
            url: '/home',
            icon: 'list'
        },
        {
            title: 'History',
            url: '/history',
            icon: 'briefcase'
        }
    ];

    constructor(
        private platform: Platform,
        private fcm: FCM,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authProvider: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private backgroundMode: BackgroundMode,
        public helperService: HelperService,
        public authGuard: AuthGuard
    ) {
        this.sideMenu();
        this.initializeApp();
        this.platform.ready()
            .then(() => {
                this.backgroundMode.enable();

                // this.fcm.onNotification().subscribe(data => {
                //     if (data.wasTapped) {
                //         console.log('Received in background');
                //     } else {
                //         console.log('Received in foreground');
                //     }
                //     ;
                // });
                //
                // this.fcm.onTokenRefresh().subscribe(token => {
                //     // Register your new token in your back-end if you want
                //     // backend.registerToken(token);
                // });
                //
                // this.getToken();
            });
    }

    getToken() {
        console.log('*******************************************************');
        this.status = 'get token started';
        this.fcm.getToken().then(token => {
            console.log('##################################################');
            this.status = "token found";
            console.log(token);
            this.token = token;
            this.helperService.showSuccessToast('Done with #{token}');
            // Register your new token in your back-end if you want
            // backend.registerToken(token);
        }).catch((error) => {
            this.status = 'error';
            this.status = error;
        });

        this.status = "get token finished";
    }

    getProfile() {
        this.authProvider.getProfile().subscribe(resp => {
            this.user = resp;
        }, err => {
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#1B8895');
            this.splashScreen.hide();
            setTimeout(() => {
                this.getToken();
               }, 5000);
        });
        this.setUserData();
        this.getProfile();
    }

    sideMenu() {
        this.navigate = [
            {
                title: 'Login',
                url: '/login',
                icon: 'lock-closed-outline'
            },
            {
                title: 'Forgot Password',
                url: '/forgot-password',
                icon: 'key-outline'
            }
        ];
    }

    logout() {
        this.helperService.showLoader();
        this.authProvider.logout().subscribe(resp => {
            this.helperService.dismissLoader();
            // this.router.navigateByUrl('/login');
            window.location.href = '/login';
            this.helperService.showUpdateToast('You have successfully logged out!');
        }, err => {
        });
    }

    setUserData() {
        this.isSignedIn = this.authProvider.signedIn();
        if (this.isSignedIn) {
            this.router.navigateByUrl('/home');
        }
        console.log(this.isSignedIn);
        this.authProvider.getCurrentUser().subscribe(resp => {
            this.user = resp.profile;
            if (this.user.type === 'Admin') {
                this.navigate = this.adminMenu;
            } else {
                this.navigate = this.generalMenu;
            }
        }, err => {
            this.user = null;
            if (err.status === 401) {
                this.router.navigateByUrl('/login');
            }
        });
    }
}
