import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocauxComponent } from './locaux/locaux.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    LocauxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAlmUCkwsfy8V6dmtkr7xI0_F60C25xgmY',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
