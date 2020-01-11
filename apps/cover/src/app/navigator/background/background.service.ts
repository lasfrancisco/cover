import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Background {

  readonly style$ = new BehaviorSubject<any>(undefined);

  //constructor() {}

  public style(style: any) { this.style$.next(style); }

  public clear() { this.style$.next(undefined); }
}
