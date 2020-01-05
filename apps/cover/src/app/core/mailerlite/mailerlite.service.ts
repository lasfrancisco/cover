import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface MailerLiteConfig {

  url?: string;// "https://app.mailerlite.com/webforms/submit/",
  code?: string;
}

export const MailerLiteConfigToken = new InjectionToken<MailerLiteConfig>('wizdm.mailerlite.config');

export type MailerLiteForm = { [field:string]: string };

@Injectable()
export class MailerLite {
  
  constructor(private http: HttpClient, @Inject(MailerLiteConfigToken) private config: MailerLiteConfig) {}

  private get urlWebforms(): string {
    // Makes sure the baser url always ends up clean
    return (this.config.url && this.config.url.endsWith('/') ? this.config.url : this.config.url + '/') || "https://app.mailerlite.com/webforms/submit/";
  }

  public post(form: MailerLiteForm, code?: string) : Promise<string> {

    return this.http.post<string>(this.urlWebforms + code || this.config.code, this.body(form), { 
      headers: { 'Content-Type': 'application/X-www-form-urlencoded' } 
    }).toPromise();
  }

  private body(form: MailerLiteForm): string {
    // Prepare the body encoding the fields and terminating with the ml-submit=1
    // Note that MailerLite fields are in the form 'fields[key]=value'
    return Object.keys(form).reduce( (body, field) => {
    
      return body + 'fields%5B' + field + '%5D=' + encodeURIComponent( form[field] ) + '&';

    }, '') + 'ml-submit=1';
  }
}
