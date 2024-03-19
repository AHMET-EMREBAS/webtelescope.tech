import { Inject, Provider } from '@nestjs/common';
import { TemplateFunction } from 'ejs';
import { Transporter } from 'nodemailer';
import {
  InjectEmailTemplateFunction,
  InjectEmailTransporter,
} from './providers';
import {
  InjectAppName,
  InjectCompanyName,
  InjectDomainName,
} from '../providers';

export type EmailOptions = {
  to: string;
  subject: string;
  username: string;
  message: string;
  securityCode?: string;
  token?: string;
  asText?: string;
};

export class EmailService {
  constructor(
    private readonly transporter: Transporter,
    private readonly templateFunction: TemplateFunction,
    private readonly companyName: string,
    private readonly domain: string,
    private readonly appName: string
  ) {}
  async send(options: EmailOptions) {
    const { to, subject, asText, username } = options;

    const html = this.templateFunction({
      ...options,
      domain: this.domain,
      appName: this.appName,
      company: this.companyName,
      username,
    });

    await this.transporter.sendMail({
      to,
      subject,
      text: asText ?? '',
      html,
    });
  }
}

export function getEmailServiceToken(templateName: string) {
  return `${templateName}_EMAIL_SERVICE_TOKEN`;
}

export function provideEmailService(templateName: string): Provider {
  class XEmailService extends EmailService {
    constructor(
      @InjectEmailTransporter(templateName) transporter: Transporter,
      @InjectEmailTemplateFunction(templateName)
      templateFunction: TemplateFunction,
      @InjectDomainName() domain: string,
      @InjectAppName() appName: string,
      @InjectCompanyName() companyName: string
    ) {
      super(transporter, templateFunction, companyName, domain, appName);
    }
  }

  return {
    provide: getEmailServiceToken(templateName),
    useClass: XEmailService,
  };
}

export function InjectEmailService(templateName: string) {
  return Inject(getEmailServiceToken(templateName));
}
