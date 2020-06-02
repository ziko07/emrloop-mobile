import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HistoryComponent} from './hisyory/hisyory.component';
import {DetailsComponent} from './details/details.component';
import {QuizComponent} from './quiz/quiz.component';
import {AngularTokenService} from 'angular-token';
import {AuthGuardService as AuthGuard} from '../services/auth/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'message/:message_id',
        component: DetailsComponent,
        canActivate: [AuthGuard]
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
