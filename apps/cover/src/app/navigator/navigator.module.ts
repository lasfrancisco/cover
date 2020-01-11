import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TogglerModule } from '@wizdm/elements/toggler';
import { ActionLinkModule } from 'app/utils/action-link';
import { FeedbackModule } from 'app/dialogs/feedback/feedback.module';
import { NavbarModule } from './navbar/navbar.module'; 
import { MenuModule } from './menu/menu.module'; 
import { FooterModule } from './footer/footer.module';
import { NavRoutingModule } from './navigator-routing.module';
import { NavigatorComponent } from './navigator.component';
import { TitleDirective } from './title/title.directive';

@NgModule({
  declarations: [ NavigatorComponent, TitleDirective ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    TogglerModule,
    ActionLinkModule,
    FeedbackModule,
    NavbarModule,
    MenuModule,
    FooterModule,
    NavRoutingModule
  ]
})
export class NavigatorModule { }
