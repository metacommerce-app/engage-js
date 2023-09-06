import { logger } from '../../lib/logging';
import { Routes } from '../../lib/routes';
import { IEngageUserComponent } from './IEngageUserComponent';
import { UserEvents } from './types';

export class UserEvent implements IEngageUserComponent {
  private readonly uri: string;
  private readonly url: URL;
  private readonly apiKey: string;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.PRIVATE_ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);
  }

  async signIn(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      const { wallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          userId,
          walletAddress: wallet,
          type: UserEvents.SignIn,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async signOut(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      const { wallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          userId,
          walletAddress: wallet,
          type: UserEvents.SignOut,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async signingUp(data: { userId?: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      const { wallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          userId,
          walletAddress: wallet,
          type: UserEvents.SigningUp,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async signedUp(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      const { wallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          userId,
          walletAddress: wallet,
          type: UserEvents.SignedUp,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async activity(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.userId) {
        throw new Error('Missing userId');
      }

      const { wallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          userId,
          walletAddress: wallet,
          type: UserEvents.Activity,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
