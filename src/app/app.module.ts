import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteReuseStrategy} from '@angular/router';
import {AngularTokenModule} from 'angular-token';
import {AuthGuardService as AuthGuard} from '../services/auth/auth-guard.service';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {HistoryComponent} from './hisyory/hisyory.component';
import {DetailsComponent} from './details/details.component';
import {QuizComponent} from './quiz/quiz.component';
import {AttachmentPipe} from './pipe/attachment.pipe';
import {Base} from '../services/base';

@NgModule({
    declarations: [AppComponent, LoginComponent, QuizComponent, AttachmentPipe, HistoryComponent, DetailsComponent],
    entryComponents: [QuizComponent],
    imports: [BrowserModule, IonicModule.forRoot(),
        AppRoutingModule, FormsModule, ReactiveFormsModule,
        HttpClientModule, AngularTokenModule.forRoot({
            signInPath: Base.api_url + '/auth/sign_in',
            signOutPath: Base.api_url + '/auth/sign_out',
            oAuthBase: '/login'
        })],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthGuard
    ],
    exports: [
        AttachmentPipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
