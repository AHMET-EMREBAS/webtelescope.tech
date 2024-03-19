export type EmailAuth = {
  user: string;
  pass: string;
};

export type EmailModuleOptions = {
  templateName: string;
  auth: EmailAuth;
};
