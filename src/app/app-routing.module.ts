import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HistoryComponent} from './history/history.component';
import {DetailsComponent} from './details/details.component';
import {QuizComponent} from './quiz/quiz.component';
import {AngularTokenService} from 'angular-token';
import {AuthGuardService as AuthGuard} from '../services/auth/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { GroupsComponent } from './groups/groups.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { LogosComponent } from './logos/logos.component';
import { AddLogoComponent } from './logos/add-logo/add-logo.component';
import { EditLogoComponent } from './logos/edit-logo/edit-logo.component';
import { ChangeUserTypeComponent } from './users/change-user-type/change-user-type.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'users/new',
        component: AddUserComponent
    },
    {
        path: 'users/change',
        component: ChangeUserTypeComponent
    },
    {
        path: 'groups',
        component: GroupsComponent
    },
    {
        path: 'clients',
        component: ClientsComponent
    },
    {
        path: 'clients/new',
        component: AddClientComponent
    },
    {
        path: 'clients/edit',
        component: EditClientComponent
    },
    {
        path: 'logos',
        component: LogosComponent
    },
    {
        path: 'logos/new',
        component: AddLogoComponent
    },
    {
        path: 'logos/edit',
        component: EditLogoComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'message/:message_id',
        component: DetailsComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
