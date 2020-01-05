import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, distinctUntilChanged, catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CitiesResult {
  name: string, 
  admin: string,
  country: string, 
  population_proper: number, 
  iso2: string, 
  capital: string, 
  lat: number, 
  lng: number, 
  population: number
}

@Injectable({
  providedIn: 'root'
})
export class Cities extends Observable<CitiesResult[]> {

  private searchText$ = new BehaviorSubject<string>('')

  private inner$: Observable<CitiesResult[]>;

  constructor(private http: HttpClient) { 

    super( subscriber => this.inner$.subscribe( subscriber ) );

    this.inner$ = this.http.get<any>('assets/cities/it.json').pipe( 

      switchMap( (cities: CitiesResult[]) => this.searchText$.pipe( 
          
        distinctUntilChanged(),
          
        map( text => {

          if(!text) { return []; }

          //console.log('Searching among ' + cities.length + ' cities for:', text);

          const rx = new RegExp('^' + text.toLowerCase() );

          const matches = (cities || []).filter( city => {
            
            return city.name.toLowerCase().match(rx) !== null;
          });

          //console.log('Matching ' + matches.length + ' cities meeting the criteria');

          matches.sort( (a, b) =>  new Intl.Collator().compare(a.name, b.name) );

          return matches;
        })
      )),

      catchError( () => [] )
    );
  }

  public search(city: string) {

    this.searchText$.next(city);
  }
}
