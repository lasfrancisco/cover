import { NgModule, ModuleWithProviders } from '@angular/core';
import { MailerLite, MailerLiteConfig, MailerLiteConfigToken } from './mailerlite.service';

@NgModule({
  providers: [ MailerLite ]
})
export class MailerLiteModule {

  static init(config: MailerLiteConfig): ModuleWithProviders<MailerLiteModule> {
    return {
      ngModule: MailerLiteModule,
      providers: [ { provide: MailerLiteConfigToken, useValue: config } ]
    }
  }
 }