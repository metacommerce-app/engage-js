import { logger } from '../../lib/logging';
import { Routes } from '../../lib/routes';
import { IEngageUserComponent } from './IEngageUserComponent';
import { UserEvents } from './types';

export class UserEvent implements IEngageUserComponent {
  private readonly uri: string;
  private readonly url: URL;
  private readonly apiKey: string;
  private readonly engage_inbound_source: string;

  constructor(host: string, apiKey: string, uri?: string, engage_inbound_source = 'sdk') {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.PUBLIC_ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);
    this.engage_inbound_source = engage_inbound_source;
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
          user_id: userId,
          wallet_address: wallet,
          type: UserEvents.SignIn,
          engage_inbound_source: this.engage_inbound_source,
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
          user_id: userId,
          wallet_address: wallet,
          type: UserEvents.SignOut,
          engage_inbound_source: this.engage_inbound_source,
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
          user_id: userId,
          wallet_address: wallet,
          type: UserEvents.SigningUp,
          engage_inbound_source: this.engage_inbound_source,
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
          user_id: userId,
          wallet_address: wallet,
          type: UserEvents.SignedUp,
          engage_inbound_source: this.engage_inbound_source,
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
          user_id: userId,
          wallet_address: wallet,
          type: UserEvents.Activity,
          engage_inbound_source: this.engage_inbound_source,
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
