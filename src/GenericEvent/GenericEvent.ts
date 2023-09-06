import { IEngageSubComponent } from '../Engage';
import { Routes } from '../lib/routes';
import { logger } from '../lib/logging';
import { UserEvent } from './UserEvent/UserEvent';
import { WalletEvent } from './WalletEvent/WalletEvent';
import { IEngageWalletComponent } from './WalletEvent/IEngageWalletComponent';
import { IEngageUserComponent } from './UserEvent/IEngageUserComponent';

export enum GenericEvents {
  Activity = 'engage.activity',
}

export class GenericEvent implements IEngageSubComponent {
  private readonly uri: string;
  private readonly url: URL;
  private readonly apiKey: string;

  user!: IEngageUserComponent;
  wallet!: IEngageWalletComponent;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.PRIVATE_ACTIVITY_V1;
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
        body: JSON.stringify({
          ...data,
          event_type: data.type,
          type: GenericEvents.Activity,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
