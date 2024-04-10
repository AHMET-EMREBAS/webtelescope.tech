import { IID, ITimestamp } from '../../common';

export interface IOAuth<App extends IID = IID, Scope extends IID = IID>
  extends IID,
    ITimestamp {
  name: string;
  apiKey: string;
  app: App;
  scopes: Scope[];
}
