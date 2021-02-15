import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CardModule} from 'primeng/card';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './Pages/admin/admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminPanelComponent } from './shared/admin-panel/admin-panel.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { ListUserComponent } from './Sources/list-user/list-user.component';
import { ListProfilComponent } from './Sources/list-profil/list-profil.component';
import { ManagerUserComponent } from './Sources/manager-user/manager-user.component';
import {MatTabsModule} from '@angular/material/tabs';
import {authInterceptorProviders} from './Service/interceptor.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddUserComponent } from './Sources/add-user/add-user.component';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { ManageCompetenceComponent } from './Sources/manage-competence/manage-competence.component';
import { ListGrpCompetenceComponent } from './Sources/list-grp-competence/list-grp-competence.component';
import { AddGrpCompetenceComponent } from './Sources/add-grp-competence/add-grp-competence.component';
import {AccordionModule} from 'primeng/accordion';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ListboxModule} from 'primeng/listbox';
import { DetailGrpCompComponent } from './Sources/list-grp-competence/detail-grp-comp/detail-grp-comp.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ListCompetenceComponent } from './Sources/list-competence/list-competence.component';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MsgComponent } from './Dialog/msg/msg.component';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './Service/auth.service';
import {RoleGuardService} from './Service/role-guard.service';
import { ReferentielComponent } from './Sources/referentiel/referentiel.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {PdfViewerModule} from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    AdminPanelComponent,
    ListUserComponent,
    ListProfilComponent,
    ManagerUserComponent,
    AddUserComponent,
    ManageCompetenceComponent,
    ListGrpCompetenceComponent,
    AddGrpCompetenceComponent,
    DetailGrpCompComponent,
    ListCompetenceComponent,
    MsgComponent,
    ReferentielComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CardModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    AccordionModule,
    PanelMenuModule,
    ListboxModule,
    TabMenuModule,
    ScrollPanelModule,
    DropdownModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    JwtModule,
    MessagesModule,
    MessageModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatSelectInfiniteScrollModule,
    ScrollingModule,
    MatChipsModule,
    MatAutocompleteModule,
    PdfViewerModule
  ],
  providers: [
    MessageService,
    MessagesModule,
    MessageModule,
    ListGrpCompetenceComponent,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    RoleGuardService,
    AuthService,
    JwtHelperService,
    ConfirmationService,
    authInterceptorProviders,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
