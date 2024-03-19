import { DynamicModule, Module } from '@nestjs/common';
import { EmailModuleOptions } from './email-auth';
import {
  getEmailTemplateFunctionToken,
  provideEmailTemplateFunction,
  provideEmailTransporter,
} from './providers';
import { getEmailServiceToken, provideEmailService } from './email.service';

@Module({})
export class EmailModule {
  static configure(options: EmailModuleOptions): DynamicModule {
    const { auth, templateName } = options;
    return {
      module: EmailModule,
      providers: [
        provideEmailTransporter(templateName, auth),
        provideEmailTemplateFunction(templateName),
        provideEmailService(templateName),
      ],
      exports: [
        getEmailServiceToken(templateName),
        getEmailTemplateFunctionToken(templateName),
        getEmailServiceToken(templateName),
      ],
    };
  }
}
