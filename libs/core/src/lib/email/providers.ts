import { createTransport } from 'nodemailer';
import { EmailAuth } from './email-auth';
import { Inject, Provider } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { compile } from 'ejs';

export function getEmailTransporter<T extends string = string>(
  templateName: T
) {
  return `${templateName}_TRANSPORTER_TOKEN`;
}

export function provideEmailTransporter<T extends string = string>(
  templateName: T,
  auth: EmailAuth
): Provider {
  return {
    provide: getEmailTransporter(templateName),
    useValue: createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth,
    }),
  };
}

export function InjectEmailTransporter<T extends string = string>(
  templateName: T
) {
  return Inject(getEmailTransporter(templateName));
}

export function getEmailTemplateFunctionToken<T extends string = string>(
  templateName: T
) {
  return `${templateName}_EMAIL_TEMPLATE_FUNCTION`;
}

export function provideEmailTemplateFunction<T extends string = string>(
  templateName: T
): Provider {
  const content = readFileSync(
    join(__dirname, 'emails', templateName + '.ejs')
  ).toString();

  const templateFunc = compile(content);

  return {
    provide: getEmailTemplateFunctionToken(templateName),
    useValue: templateFunc,
  };
}

export function InjectEmailTemplateFunction<T extends string = string>(
  templateName: T
) {
  return Inject(getEmailTemplateFunctionToken(templateName));
}
