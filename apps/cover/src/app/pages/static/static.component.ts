import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '@wizdm/redirect';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wm-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  host: { class: 'padding-top-toolbar' }
})
export class StaticComponent {

  readonly name$: Observable<string>;

  constructor(readonly redirect: RedirectService, route: ActivatedRoute) {

    this.name$ = route.paramMap.pipe( map( params => params && params.get('name') || '') );
  }
}
