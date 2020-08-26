import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar} from '@ionic-native/status-bar/ngx';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { FCM } from '@ionic-native/fcm/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { HelperService } from '../services/helper.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    navigate: any;
    user: any;
    token: any;
    auth_menu = [
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

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authProvider: AuthService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        // private fcm: FCM,
        private backgroundMode: BackgroundMode,
        public helperService: HelperService
    ) {
        this.sideMenu();
        this.initializeApp();
        this.platform.ready()
        .then(() => {
            this.backgroundMode.enable();

            // this.fcm.onNotification().subscribe(data => {
            //     if (data.wasTapped) {
            //         this.helperService.showDemoToast("Received in background!");
            //     } else {
            //         this.helperService.showDemoToast("Received in foreground!");
            //     }
            // })

            // this.helperService.showDemoToast("before token");

            // this.fcm.getToken().then(token => {
            //     this.helperService.showDemoToast("after token");
            //     this.token = token;
            //     this.helperService.showDemoToast("after token init!");
            // });

            // this.fcm.onTokenRefresh()
            //     .subscribe((token) => this.helperService.showDemoToast(`Got a new token ${token}`));
        });
    }


    // subscribeToTopic() {
    //     this.fcm.subscribeToTopic('syftet');
    // }

    // unsubscribeFromTopic() {
    //     this.fcm.unsubscribeFromTopic('syftet');
    // }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#1B8895');
            this.splashScreen.hide();
        });
        this.setUserData();
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
        this.authProvider.logout().subscribe(resp => {
            window.location.href = '/login';
        }, err => {
        });
    }

    setUserData() {
        this.authProvider.getCurrentUser().subscribe(resp => {
            this.user = resp.profile;
            this.navigate = this.auth_menu;
            console.log(this.user);
        }, err => {
            this.user = null;
            if (err.status == 401) {
                this.router.navigateByUrl('/login');
            }
        });
    }
}