import { Directive, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GtagService } from './gtag.service';

@Directive({
  selector: 'gtag, [gtag]'
})
export class GtagDirective implements OnChanges {

  constructor(private gtag: GtagService, private router: Router) {}

  @Input('gtag') title: string;

  @Input() path: string;

  @Input() location: string;

  ngOnChanges() {
    this.gtag.pageView(this.title, this.path, this.location || this.router.url);
  }
}