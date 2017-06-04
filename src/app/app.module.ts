import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from "@angular/router";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseConfig } from '../environments/firebase.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterConfig } from './router.config';
import { AppComponent } from './app.component';

import { AreasListComponent } from './area/areas-list/areas-list.component';
import { AreaNewComponent } from './area/area-new/area-new.component';
import { AreaShowComponent } from './area/area-show/area-show.component';
import { AreaFormComponent } from './area/area-form/area-form.component';
import { AreaEditComponent } from './area/area-edit/area-edit.component';
import { AreaPicturesComponent } from './area/area-pictures/area-pictures.component';
import { AreaResolver } from './shared/model/area/area.resolver';
import { AreaService } from './shared/model/area/area.service';

import { PlacesListComponent } from './place/places-list/places-list.component';
import { PlaceNewComponent } from './place/place-new/place-new.component';
import { PlaceShowComponent } from './place/place-show/place-show.component';
import { PlaceFormComponent } from './place/place-form/place-form.component';
import { PlaceEditComponent } from './place/place-edit/place-edit.component';
import { PlacePicturesComponent } from './place/place-pictures/place-pictures.component';
import { PlaceResolver } from './shared/model/place/place.resolver';
import { PlaceService } from './shared/model/place/place.service';


import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';

import { DialogMessageComponent } from './components/html/dialog-message/dialog-message.component';
import { AgmCoreModule } from '@agm/core';
import { CovalentCoreModule, CovalentDialogsModule } from '@covalent/core';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { QuillModule } from 'ngx-quill';
import { AreaComponent } from './area/area/area.component';
import { PlaceComponent } from './place/place/place.component';
import { GOOGLE_MAPS_API_KEY, MARKER_DEFAULT_CONFIG_PROVIDER, MARKER_DEFAULT_CONFIG } from "environments/map.config";


@NgModule({
  declarations: [
    AppComponent,
    AreasListComponent,
    AreaNewComponent,
    AreaShowComponent,
    AreaFormComponent,
    AreaEditComponent,
    AreaPicturesComponent,
    PlacesListComponent,
    PlaceNewComponent,
    PlaceShowComponent,
    PlaceFormComponent,
    PlaceEditComponent,
    PlacePicturesComponent,
    DialogMessageComponent,
    LoginComponent,
    SidenavComponent,
    AreaComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(RouterConfig),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({apiKey: GOOGLE_MAPS_API_KEY}),
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentDialogsModule,
    QuillModule
  ],
  entryComponents: [DialogMessageComponent],
  providers: [
    { provide: MARKER_DEFAULT_CONFIG_PROVIDER, useValue: MARKER_DEFAULT_CONFIG }, 
    AreaService, 
    AreaResolver, 
    PlaceService, 
    PlaceResolver, 
    AuthService, 
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
