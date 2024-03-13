import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { DetailsComponent } from './details/details.component';
// import { QuizComponent } from './quiz/quiz.component';
// import {AngularTokenService} from 'angular-token';
// import { AuthGuardService as AuthGuard } from '../services/auth/auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { GroupsComponent } from './groups/groups.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { LogosComponent } from './logos/logos.component';
import { AddLogoComponent } from './logos/add-logo/add-logo.component';
import { UpdateLogoComponent } from './logos/update-logo/update-logo.component';
import { ChangeUserTypeComponent } from './users/change-user-type/change-user-type.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { NewLoopComponent } from './new-loop/new-loop.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'inbox',
        loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxPageModule)
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
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
        path: 'users/:id',
        component: UserDetailsComponent
    },
    {
        path: 'users/:id/change',
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
        path: 'clients/:id/edit',
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
        path: 'logos/:id/edit',
        component: UpdateLogoComponent
    },
    {
        path: 'login',
        component: LoginComponent
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
    {
        path: 'new-message',
        component: NewMessageComponent
    },
    {
        path: 'new-loop',
        component: NewLoopComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
