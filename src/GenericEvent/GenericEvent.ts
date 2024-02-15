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
  private readonly engage_inbound_source: string;

  user!: IEngageUserComponent;
  wallet!: IEngageWalletComponent;

  constructor(host: string, apiKey: string, uri?: string, engage_inbound_source = 'engage-destinations') {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.PUBLIC_ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);
    this.engage_inbound_source = engage_inbound_source;

    this.user = new UserEvent(host, apiKey, this.uri);
    this.wallet = new WalletEvent(host, apiKey, this.uri);
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
          engage_inbound_source: this.engage_inbound_source,
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
