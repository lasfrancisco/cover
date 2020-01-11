import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentRouterModule, RoutesWithContent } from '@wizdm/content';
import { ReadmeModule } from '@wizdm/elements/readme';
import { GtagModule } from 'app/core/gtag';
import { NotFoundComponent } from './not-found.component';

const routes: RoutesWithContent = [
  {
    path: '',
    content: 'not-found',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReadmeModule,
    GtagModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
