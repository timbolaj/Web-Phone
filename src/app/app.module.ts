import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appReducer } from './store/app.reducer';
import { StreamsComponent } from './streams/streams.component';
import { CallerFormComponent } from './caller-form/caller-form.component';
import { CalleFormComponent } from './calle-form/calle-form.component';
import { EndCallComponent } from './end-call/end-call.component';

@NgModule({
  declarations: [
    AppComponent,
    StreamsComponent,
    CallerFormComponent,
    CalleFormComponent,
    EndCallComponent,
  ],
  imports: [
    StoreModule.forRoot({ appState: appReducer }),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
