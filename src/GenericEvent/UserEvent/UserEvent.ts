import { IEngageUserComponent } from '../../Engage/EngageSubComponent';
import { logger } from '../../lib/logging';
import { Routes } from '../../lib/routes';

export class UserEvent implements IEngageUserComponent {
  private uri: string;
  private url: URL;
  private apiKey: string;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);
  }

  async login(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...data,
          type: 'engage.events.user.login',
          userId: data.userId,
          walletAddress: data.wallet,
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async logout(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...data,
          type: 'engage.events.user.logout',
          userId: data.userId,
          walletAddress: data.wallet,
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async signingUp(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...data,
          type: 'engage.events.user.signingUp',
          userId: data.userId,
          walletAddress: data.wallet,
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
