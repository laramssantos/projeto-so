import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { CpuComponent } from './cpu/cpu.component';
import { TopComponent } from './top/top.component';
import { MemoriaComponent } from './memoria/memoria.component';
import { DiscoComponent } from './disco/disco.component';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CpuComponent,
    TopComponent,
    MemoriaComponent,
    DiscoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
