import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DoorbellService } from '@wizdm/doorbell';
//import { MailerLite } from 'app/core/mailerlite';

@Component({
  selector: 'wm-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  public email: string;
  public posting = false;

  constructor(/*private mailerlite: MailerLite,*/ private doorbell: DoorbellService) { }

  @Input() country: string;

  @Input() city: string;

  @Input() ip: string;

  @Output() done = new EventEmitter<void>();

  public subscribe() {
    
    /*
    this.mailerlite.post({ 

      email: this.email,
      country: this.country || '',
      city: this.city || ''

    })
      //.catch(error => this.showError() );
    */

    this.posting = true;

    this.doorbell.submit({

      ip: this.ip || undefined,
      email: this.email,
      message: `Writing from ${ this.city || this.country }.\n
                Please keep me posted.`,
      tags: 'subscribe'
    })
    .then( () => { this.posting = false; this.done.emit(); })
    .catch( error => console.error(error) );
  }
}
