import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectPaysComponent } from './select-pays/select-pays.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectPaysComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
