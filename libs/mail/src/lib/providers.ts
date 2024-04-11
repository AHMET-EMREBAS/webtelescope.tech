import { createTransport } from 'nodemailer';
import { EmailAuth } from './email-auth';
import { Inject, Provider } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { compile } from 'ejs';

export function getEmailTransporterToken<T extends string = string>(
  templateName: T
) {
  return `${templateName}_TRANSPORTER_TOKEN`;
}

export function provideEmailTransporter<T extends string = string>(
  templateName: T,
  auth: EmailAuth,
  host: string
): Provider {
  return {
    provide: getEmailTransporterToken(templateName),
    useValue: createTransport({
      host,
      port: 465,
      secure: true,
      auth,
    }),
  };
}

export function InjectEmailTransporter<T extends string = string>(
  templateName: T
) {
  return Inject(getEmailTransporterToken(templateName));
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

  const templateFunc = compile(content, {
    includer: (file) => {
      const modifiedFilename = join(__dirname, 'emails', file + '.ejs');
      return { filename: modifiedFilename };
    },
  });

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





export function getEmailAuthToken(templateName: string) {
  return `${templateName}_EMAIL_AUTH_TOKEN`;
}

export function provideEmailAuth(
  templateName: string,
  user: string,
  pass: string
): Provider {
  return {
    provide: getEmailAuthToken(templateName),
    useValue: { user, pass },
  };
}

export function InjectEmailAuth(templateName: string) {
  return Inject(getEmailAuthToken(templateName));
}
