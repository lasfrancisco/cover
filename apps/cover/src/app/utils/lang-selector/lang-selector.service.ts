import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DateAdapter } from '@angular/material';
import { ContentSelector, ContentConfigurator } from '@wizdm/content';
import { IpList } from 'app/core/iplist';
import { pluck, map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import moment from 'moment';

/**
 * Seletcs the language
 */
@Injectable()
export class LanguageSelector extends ContentSelector {

  constructor(private adapter: DateAdapter<any>, private iplist$: IpList, router: Router, config: ContentConfigurator) { 
    super(router, config); 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree | Observable<UrlTree> {

    // Gets the requested language code from the route
    const requested = route.paramMap.get( this.config.selector );
    //console.log('Requested language:', requested);

    // Whenever the requested language is allowed...
    if( this.isLanguageAllowed(requested) ) { 

      // Updates the adapter's locale according to the new language keeping track of the current language for further use
      this.adapter.setLocale( moment.locale( this.config.currentValue = requested ) );
      // Proceed with the routing
      return true; 
    }

    // Whenever the request is to detect the preferred language...
    if( requested === 'auto' ) {

      // Gets the IP related information from iplist.cc
      return this.iplist$.pipe( 
        
        // Plucks the country code only
        pluck('countrycode'), map( (country: string) => {

          // Simply map the common English speaking nations to 'en'
          if(country === 'US' || country === 'GB' || country === 'AU') { country = 'EN'; }

          // Guesses the preferred language from the ip whenever possible or the browser otherwise
          const preferred = this.languageAllowed( country && country.toLowerCase() || this.browserLanguage );
          //console.log('Guessed preferred language:', preferred);

          //Redirects to the preferred language
          return this.router.parseUrl(preferred);
        }),

        // Makes sure the observable completes
        first()
      );
    }

    // At this point the requested language is not supported or may be not a language at all, so, 
    // appends the full url to the current language and redirects
    const redirect = '/' + this.config.currentValue + state.url;
    //console.log("Redirecting:", redirect);

    // Builds an UrlTree from the new url to redirect to
    return this.router.parseUrl(redirect);
  }
}
