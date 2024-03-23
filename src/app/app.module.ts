import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
// import {AngularTokenModule} from 'angular-token';
import { AuthGuardService as AuthGuard } from '../services/auth/auth-guard.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { DetailsComponent } from './details/details.component';
import { QuizComponent } from './quiz/quiz.component';
import { AttachmentPipe } from './pipe/attachment.pipe';
// import {Base} from '../services/base';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ChangeUserTypeComponent } from './users/change-user-type/change-user-type.component';
import { GroupsComponent } from './groups/groups.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { LogosComponent } from './logos/logos.component';
import { AddLogoComponent } from './logos/add-logo/add-logo.component';
import { UpdateLogoComponent } from './logos/update-logo/update-logo.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { PopoverComponent } from './popover/popover.component';
import { NewMessageComponent } from './new-message/new-message.component';
// import {InboxPage} from './inbox/inbox.page';
import { NewLoopComponent } from './new-loop/new-loop.component';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        HomeComponent,
        QuizComponent,
        AttachmentPipe,
        ProfileComponent,
        HistoryComponent,
        DetailsComponent,
        ForgotPasswordComponent,
        UsersComponent,
        UserDetailsComponent,
        AddUserComponent,
        ChangeUserTypeComponent,
        GroupsComponent,
        ClientsComponent,
        AddClientComponent,
        EditClientComponent,
        LogosComponent,
        AddLogoComponent,
        UpdateLogoComponent,
        PopoverComponent,
        NewMessageComponent,
        NewLoopComponent
    ],
    entryComponents: [QuizComponent, ChangeUserTypeComponent, PopoverComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AngularEditorModule,
        AppRoutingModule, FormsModule, ReactiveFormsModule,
        HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AuthGuard,
        BackgroundMode,
        FileChooser,
        FilePath,
        File,
        Network
    ],
    exports: [
        AttachmentPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
