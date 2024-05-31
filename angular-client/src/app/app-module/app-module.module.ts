import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { DonationFormComponent } from '../pages/donation-form/donation-form.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent, 
    DonationFormComponent
  ],
  providers: [],
  bootstrap: [] 
})
export class AppModule { 
  ngDoBootstrap() {
    bootstrapApplication(AppComponent);
  }
}
