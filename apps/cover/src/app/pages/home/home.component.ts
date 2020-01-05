import { Component, OnDestroy } from '@angular/core';
import { DoorbellService } from '@wizdm/doorbell';
import { IpList } from 'app/core/iplist';
import { IpInfo } from 'app/core/ipinfo';
import { Observable, Subject, BehaviorSubject, Subscription, of, merge } from 'rxjs';
import { flatMap, map, filter, shareReplay } from 'rxjs/operators';

export interface Analitics {
  ip: string;
  country: string;
  city?: string;
  search: string;
}

type Modes = 'search' | 'soon' | 'sorry' | 'thanks';

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  readonly mode$: Observable<Modes>;
  private changeMode$ = new Subject<Modes>();

  public find() { this.search = ''; this.changeMode$.next('search'); }
  public comingSoon() { this.changeMode$.next('soon'); }
  public thankYou() { this.changeMode$.next('thanks'); }
  public sorry() { this.changeMode$.next('sorry'); }

  private search$ = new BehaviorSubject<string>('');
  
  get search(): string { return this.search$.value; }
  set search(city: string) { this.search$.next(city); }

  readonly report$: Observable<Analitics>;
  private sub: Subscription;

  constructor(readonly ipinfo$: IpInfo, readonly iplist$: IpList, private doorbell: DoorbellService) { 

    // Inits the mode observable based on the country from iplist (unimited free calls)
    this.mode$ = merge( this.changeMode$, iplist$.pipe( map( list => list.countrycode === 'IT' ? 'search' : 'sorry' )));    

    // Builds the analitics report whenever searching for a city
    this.report$ = this.search$.pipe( 
      
      // Skips empty search (resets)
      filter(search => search.length > 0), 
      
      // Runs the analytics
      flatMap( search => {

        // Asks iplist.cc for free country level localization
        return iplist$.pipe( flatMap( list => {

          // Skips further research when out of Italy
          if(list.countrycode !== 'IT') { return of({ ip: list.ip, country: list.countrycode, search }); }
    
          // Asks ipinfo.io for city level localization otherwhise
          return ipinfo$.pipe( map( info => {
    
            return {
              ip: info.ip,
              city: info.city,
              country: info.country, // it ?
              search
            };
          }));
        }));
      }),

      // Makes sure everybody gets the same report
      shareReplay(1),
    );
    
    // Submits the report to Doorbell
    this.sub = this.report$.subscribe( (report: Analitics) => this.doorbell.submit({

      ip: report.ip,
      email: 'hello@coverpizza.com',
      message: `Searching CoverPizza availability in ${report.search}.\n
                City search performed from ${report.city || report.country}.\n`,
      tags: report.search
    }));
  }

  // Disposes of the subscriptions
  ngOnDestroy() { this.sub && this.sub.unsubscribe(); }
}
