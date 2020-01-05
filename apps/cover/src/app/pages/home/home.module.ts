import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentRouterModule, RoutesWithContent } from '@wizdm/content';
import { RedirectModule } from '@wizdm/redirect';
import { AnimateModule } from '@wizdm/animate';
import { IconModule } from '@wizdm/elements/icon';
import { ReadmeModule } from '@wizdm/elements/readme';
import { HomeComponent } from './home.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

const routes: RoutesWithContent = [
  {
    path: '',
    content: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [ HomeComponent, SearchboxComponent, NewsletterComponent ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    RedirectModule,
    AnimateModule,
    IconModule, 
    ReadmeModule,
    //IllustrationModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class HomeModule { }
