import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Platform} from '@ionic/angular';

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
    token: any = 'Init';
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
        this.platform.ready().then(() => {
            this.backgroundMode.enable();
        });
    }

    getProfile(): void {
        this.authProvider.getProfile().subscribe(resp => {
            this.user = resp;
        }, err => {
            console.log(err);
        });
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#1B8895');
            this.splashScreen.hide();
            this.setUserData();
            this.getProfile();
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

    setUserData() {
        this.isSignedIn = this.authProvider.signedIn();
        if (this.isSignedIn) {
            this.router.navigateByUrl('/home');
        }
        console.log(206, this.isSignedIn);
        console.log(207, this.token);
        console.log(208, this.osType);
        this.onGetCurrentUser();
    }
}
