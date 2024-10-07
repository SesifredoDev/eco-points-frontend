import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicPullupModule } from 'ionic-pullup';
import { CirclePercentageComponent } from './circle-percentage/circle-percentage.component';

@NgModule({
  declarations: [AppComponent, CirclePercentageComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicPullupModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
