import { Inject, Provider } from '@nestjs/common';
import { TemplateFunction } from 'ejs';
import { Transporter } from 'nodemailer';
import {
  InjectEmailTemplateFunction,
  InjectEmailTransporter,
} from './providers';

export type EmailOptions<
  T extends { [key: string]: unknown } = Record<string, unknown>
> = {
  to: string;
  subject: string;
  text?: string;
  data?: T;
};

export class EmailService {
  constructor(
    private readonly transporter: Transporter,
    private readonly templateFunction: TemplateFunction,
    private readonly from: string
  ) {}
  async send(options: EmailOptions) {
    const { to, subject, text } = options;

    const html = this.templateFunction({ data: options.data });

    await this.transporter.sendMail({
      to,
      from: this.from,
      subject,
      text,
      html,
    });
  }
}

export function getEmailServiceToken(templateName: string) {
  return `${templateName}_EMAIL_SERVICE_TOKEN`;
}

export function provideEmailService(
  templateName: string,
  from: string
): Provider {
  class XEmailService extends EmailService {
    constructor(
      @InjectEmailTransporter(templateName) transporter: Transporter,
      @InjectEmailTemplateFunction(templateName)
      templateFunction: TemplateFunction
    ) {
      super(transporter, templateFunction, from);
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
