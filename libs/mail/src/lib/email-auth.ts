export type EmailAuth = {
  user: string;
  pass: string;
};

export type EmailModuleOptions = {
  templateName: string;
  auth: EmailAuth;
  emailTitle: string;
  /**
   * Ex: smtp.titan.email
   */
  emailHost: string;
};
