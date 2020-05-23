import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    navigate: any;
    user: any;
    auth_menu = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'To Do',
            url: '/todo',
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
        private activateRoute: ActivatedRoute
    ) {
        this.sideMenu();
        this.initializeApp();
    }

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
        }, err => {
            this.user = null;
            if (err.status == 401) {
                this.router.navigateByUrl('/login');
            }
        });
    }
}
