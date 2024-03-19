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
    const { auth, templateName, emailHost, emailTitle } = options;
    return {
      module: EmailModule,
      providers: [
        provideEmailTransporter(templateName, auth, emailHost),
        provideEmailTemplateFunction(templateName),
        provideEmailService(templateName, `"${emailTitle}" <${auth.user}>`),
      ],
      exports: [
        getEmailServiceToken(templateName),
        getEmailTemplateFunctionToken(templateName),
        getEmailServiceToken(templateName),
      ],
    };
  }
}

export type EmailClustorModuleOptions = {
  host: string;
  templates: [
    user: string,
    pass: string,
    title: string,
    templateName: string
  ][];
};

@Module({})
export class EmailClustorModule {
  static configure(options: EmailClustorModuleOptions): DynamicModule {
    const modules = options.templates.map(
      ([user, pass, title, templateName]) => {
        return EmailModule.configure({
          auth: { user, pass },
          templateName,
          emailHost: options.host,
          emailTitle: title,
        });
      }
    );
    return {
      module: EmailClustorModule,
      imports: [...modules],
      exports: [...modules],
    };
  }
}
