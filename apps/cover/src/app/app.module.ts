import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatIconRegistry, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ContentModule } from '@wizdm/content';
import { DoorbellModule } from '@wizdm/doorbell';
import { ReadmeNavigator } from '@wizdm/elements/readme';
import { RedirectService } from '@wizdm/redirect';
import { IpInfoModule } from 'app/core/ipinfo';
import { GtagModule } from 'app/core/gtag';
//import { MailerLiteModule } from 'app/core/mailerlite';
import { AppComponent } from './app.component';  
//import { environment } from '../environments/environment';
import { appname, content, router } from '../environments/common';
import { firebase, doorbell, ipinfo, gtag, mailerlite } from '../environments/secrets';

// Define the singe lazy loading navigation routes
const routes: Routes = [ 
  { path: '', loadChildren: () => import('./navigator/navigator.module').then(m => m.NavigatorModule) }
];

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    // Basics
    BrowserModule,
    BrowserAnimationsModule,
    // Dynamic content (i18n)
    ContentModule.init(content),    
    // Doorbell service (Feedback form)
    DoorbellModule.init(doorbell),
    // IpInfo services
    IpInfoModule.init(ipinfo),
    // Google Analytics
    GtagModule.init(gtag),
    // MailerLite
    //MailerLiteModule.init(mailerlite),
    // Angular's Router
    RouterModule.forRoot(routes, router)
  ],
  providers: [
    // Provides the redirection service globally
    RedirectService,
    // Applies the  redirection service to ReadmeComponent from @wizdm/elements
    { provide: ReadmeNavigator, useExisting: RedirectService },
    // Provides the MatIconRegistry globally
    MatIconRegistry,
    // Provides the MomentDateAdaper globally for @angular/material DatePicker
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ]},
    // Configures Material Date Format accordingly
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
