import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CpuComponent } from './cpu/cpu.component';
import { TopComponent } from './top/top.component';
import { MemoriaComponent } from './memoria/memoria.component';
import { DiscoComponent } from './disco/disco.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CpuComponent,
    TopComponent,
    MemoriaComponent,
    DiscoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
