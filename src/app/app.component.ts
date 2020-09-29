import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Platform} from '@ionic/angular';

import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
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
    token: string;
    osType: string;
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
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.backgroundMode.enable();
            this.statusBar.backgroundColorByHexString('#1B8895');
            this.splashScreen.hide();
            this.getOsType();
            this.setUserData();
            this.getProfile();
        });
    }

    onPushNotification(): void {
        this.authProvider.push(this.token, this.osType).subscribe(
            resp => {
                console.log(resp);
            }, err => {
                console.log(err);
            }
        );
    }

    getToken(): void {
        this.fcm.getToken().then(token => {
            this.token = token;
            this.authProvider.push(this.token, this.osType).subscribe(
                resp => {
                    console.log(resp);
                }, err => {
                    console.log(err);
                }
            );
        }).catch((error) => {
                this.token = error;
                console.log(error);
            }
        );
    }

    getOsType(): void {
        if (this.platform.is('ios')) {
            this.osType = 'ios';
        } else if (this.platform.is('android')) {
            this.osType = 'android';
        }
    }

    getProfile(): void {
        this.authProvider.getProfile().subscribe(resp => {
            this.user = resp;
        }, err => {
            console.log(err);
        });
    }

    sideMenu(): void {
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

    logout(): void {
        this.helperService.showLoader();
        this.authProvider.logout().subscribe(resp => {
            this.helperService.dismissLoader();
            window.location.href = '/login';
            this.helperService.showUpdateToast('You have successfully logged out!');
        }, err => {
        });
    }

    onGetCurrentUser(): void {
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

    setUserData(): void {
        this.isSignedIn = this.authProvider.signedIn();
        console.log(this.isSignedIn);
        if (this.isSignedIn) {
            setTimeout(() => {
                this.getToken();
            }, 2000);
            this.router.navigateByUrl('/home');
        }
        this.onGetCurrentUser();
        this.onPushNotification();
    }
}
