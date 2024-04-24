export interface IPasswordService {
  hash(): Promise<string>;
  compare(data: string, hashed: string): boolean;
}
