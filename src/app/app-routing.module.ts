import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './Pages/admin/admin.component';
import {ManagerUserComponent} from './Sources/manager-user/manager-user.component';
import {AddUserComponent} from './Sources/add-user/add-user.component';
import {ManageCompetenceComponent} from './Sources/manage-competence/manage-competence.component';
import {DetailGrpCompComponent} from './Sources/list-grp-competence/detail-grp-comp/detail-grp-comp.component';
import {RoleGuardService as RoleGuard} from './Service/role-guard.service';
import {ReferentielComponent} from './Sources/referentiel/referentiel.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'} ,
  children: [
    {path: 'users', component: ManagerUserComponent},
    {path: 'add-user', component: AddUserComponent},
    {path: 'competences', component: ManageCompetenceComponent},
    {path: 'competences/detail', component: DetailGrpCompComponent},
    {path: 'referentiels', component: ReferentielComponent}
  ]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
