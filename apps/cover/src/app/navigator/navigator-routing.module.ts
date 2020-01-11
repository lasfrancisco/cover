import { NgModule } from '@angular/core';
import { ContentRouterModule, RoutesWithContent } from '@wizdm/content';
import { RedirectService } from '@wizdm/redirect';
import { LanguageSelector } from 'app/utils/lang-selector';
import { ActionLinkObserver } from 'app/utils/action-link';

import { NavigatorComponent } from './navigator.component';

const routes: RoutesWithContent = [

  // External links redirection helper
  { path: 'redirect', canActivate: [ RedirectService ] },
  
  // Triggers language autodetection
  { path: '', redirectTo: 'auto', pathMatch: 'full' },
  
  // Loads te main window (navigator) together with the localized content 
  {
    path: ':lang',
    
    component: NavigatorComponent,
    
    canActivate: [ LanguageSelector ],
    
    content: ['navigator', 'login', 'feedback'],
    
    children: [
      
      // Home page
      { path: '', loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule) },
      { path: 'home', redirectTo: '', pathMatch: 'full' },

      // Intercepts routing "action-links" to execute a non-routing action
      { path: 'contact',     canActivate: [ ActionLinkObserver ] },
      { path: 'back',        canActivate: [ ActionLinkObserver ] },
      
      // Not found page
      { path: 'not-found',   loadChildren: () => import('../pages/not-found/not-found.module').then(m => m.NotFoundModule) },      

      // Static content pages, redirecting to NotFound when no content is available
      { path: ':name',       loadChildren: () => import('../pages/static/static.module').then(m => m.StaticModule) }
    ]
  }
];

@NgModule({
  imports: [ ContentRouterModule.forChild(routes) ],
  exports: [ ContentRouterModule ],
  providers: [ LanguageSelector ]
})
export class NavRoutingModule {}