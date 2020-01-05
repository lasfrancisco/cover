import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cities, CitiesResult } from 'app/core/cities';

@Component({
  selector: 'wm-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent  {

  public searching = false;

  constructor(readonly cities$: Cities) { }

  @Input() city: string = '';

  @Output() cityChange = new EventEmitter<string>();

  @Output() fail = new EventEmitter<void>();

  public listOn(el: HTMLElement) {

    const rt = el.getBoundingClientRect();
    return { 
      position: 'fixed', 
      top: rt.bottom + 'px', 
      width: rt.width + 'px'
    };
  }

  public match(text: string) {

    this.cities$.search(text);
  }

  public search(city: CitiesResult) {

    this.match('');

    this.cityChange.emit(this.city = city.name);

    this.searching = true;

    setTimeout(() => {

      this.searching = false;
      
      this.fail.emit();
    
    }, 2000);
  }
}
