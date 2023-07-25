import { IEngageSubComponent } from '../Engage';
import { Routes } from '../lib/routes';
import { logger } from '../lib/logging';
import { IEngageUserComponent, IEngageWalletComponent } from 'src/Engage/EngageSubComponent';
import { UserEvent } from './UserEvent/UserEvent';
import { WalletEvent } from './WalletEvent/WalletEvent';

export class GenericEvent implements IEngageSubComponent {
  private uri: string;
  private url: URL;
  private apiKey: string;

  user!: IEngageUserComponent;
  wallet!: IEngageWalletComponent;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);

    this.user = new UserEvent(host, apiKey, uri);
    this.wallet = new WalletEvent(host, apiKey, uri);
  }

  async send(data: { [param: string]: string; type: string }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify(data),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
