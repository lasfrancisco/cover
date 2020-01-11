import { Directive, Input, OnChanges } from '@angular/core';
import { Background } from './background.service';

@Directive({
  selector: 'wm-background'
})
export class BackgroundDirective implements OnChanges {

  constructor(private bk: Background) {}
  
  @Input() attachment: string;

  @Input() clip: string;

  @Input() color: string;

  @Input() image: string;

  @Input() url: string;

  @Input() origin: string;

  @Input() position: string;

  @Input() repeat: string;

  @Input() size: string;

  ngOnChanges() {

    this.bk.style({
      "background-attachment": this.attachment,
      "backgroung-clip": this.clip,
      "background-color": this.color,
      "background-image": this.image || (this.url && 'url(' + this.url + ')'),
      "background-origin": this.origin,
      "background-position": this.position,
      "background-repeat": this.repeat,
      "background-size": this.size
    });
  }
}
