export const FORBIDDEN_DBNAMES = ['main', 'template', 'root', ''];

export interface IDatabaseManager {
  create(databasename: string): Promise<void>;
  createUserFor(
    databaseName: string,
    username: string,
    password: string
  ): Promise<void>;

  createFromTemplate(databaseName: string, templateName: string): Promise<void>;
}
