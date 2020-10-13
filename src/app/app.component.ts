import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Platform} from '@ionic/angular';

import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import { Network } from '@ionic-native/network/ngx';

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
    regId: string;
    osType: string;
    adminMenu = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'My Profile',
            url: '/profile',
            icon: 'information-circle-outline'
        },
        {
            title: 'Inbox',
            url: '/inbox',
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
    powerUserMenu = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'My Profile',
            url: '/profile',
            icon: 'information-circle-outline'
        },
        {
            title: 'Inbox',
            url: '/inbox',
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
        }
    ];
    userMenu = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'My Profile',
            url: '/profile',
            icon: 'information-circle-outline'
        },
        {
            title: 'Inbox',
            url: '/inbox',
            icon: 'list'
        },
        {
            title: 'History',
            url: '/history',
            icon: 'briefcase'
        }
    ];
    isConnected: boolean;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authProvider: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private backgroundMode: BackgroundMode,
        public helperService: HelperService,
        public authGuard: AuthGuard,
        private fcm: FCM,
        private network: Network
    ) {
        // this.connectSubscription();
        this.initializeApp();
        this.setUserData();
        this.getProfile();
        this.sideMenu();
        this.disconnectSubscription();
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.backgroundMode.enable();
            setTimeout(() => {
                this.onNotificationTap();
            }, 5000);
            this.statusBar.backgroundColorByHexString('#1B8895');
            this.splashScreen.hide();
        });
    }

    connectSubscription(): void {
        this.network.onConnect().subscribe(() => {
            this.helperService.showSuccessToast('network connected :-D');
        });
    }

    disconnectSubscription(): void {
        this.network.onDisconnect().subscribe(() => {
            this.helperService.showAlert('Please connect to the internet.');
            if (this.user.type === 'Admin') {
                this.navigate = this.adminMenu;
            } else if (this.user.type === 'User') {
                this.navigate = this.userMenu;
            } else {
                this.navigate = this.powerUserMenu;
            }
        });
    }

    onNotificationTap(): void {
        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                this.router.navigateByUrl('/inbox');
            } else {
                this.helperService.showMessageAlert();
            }
        });
    }

    getProfile(): void {
        this.authProvider.getProfile().subscribe(resp => {
            console.log(resp);
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
            this.regId = null;
            this.helperService.showUpdateToast('You have successfully logged out!');
        }, err => {
        });
    }

    onGetCurrentUser(): void {
        this.authProvider.getCurrentUser().subscribe(resp => {
            this.user = resp.profile;
            if (this.user.type === 'Admin') {
                this.navigate = this.adminMenu;
            } else if (this.user.type === 'User') {
                this.navigate = this.userMenu;
            } else {
                this.navigate = this.powerUserMenu;
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
            this.router.navigateByUrl('/home');
        }
        this.onGetCurrentUser();
    }
}
