import { logger } from '../../lib/logging';
import { Routes } from '../../lib/routes';
import { IEngageWalletComponent } from './IEngageWalletComponent';
import { WalletEvents } from './types';

export class WalletEvent implements IEngageWalletComponent {
  private readonly uri: string;
  private readonly url: URL;
  private readonly apiKey: string;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.PRIVATE_ACTIVITY_V1;
    this.url = new URL(`${host}/${this.uri}`);
  }

  async mint(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.wallet) {
        throw new Error('Missing wallet');
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
          type: WalletEvents.Mint,
          walletAddress: wallet,
          userId: userId,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async activity(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.wallet) {
        throw new Error('Missing wallet');
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
          type: WalletEvents.Activity,
          walletAddress: wallet,
          userId: userId,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async transaction(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.wallet) {
        throw new Error('Missing wallet');
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
          type: WalletEvents.Transaction,
          walletAddress: wallet,
          userId: userId,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }

  async transfer(data: { fromWallet: string; toWallet: string; userId?: string; [params: string]: unknown }, numberOfRetries = 1): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ] with ${numberOfRetries} retries left`);

    try {
      if (!data.fromWallet) {
        throw new Error('Missing fromWallet');
      }

      if (!data.toWallet) {
        throw new Error('Missing toWallet');
      }

      const { fromWallet, toWallet, userId, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          walletAddress: fromWallet,
          userId: userId,
          type: WalletEvents.Transfer,
          engage_inbound_source: 'sdk',
        }),
      });

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          walletAddress: toWallet,
          userId: userId,
          type: WalletEvents.Received,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      if (numberOfRetries === 0) {
        throw e;
      }
      logger.error(`There was an error sending request to [ ${this.url} ], retrying...`);
      await this.transfer(data, numberOfRetries - 1);
    }
  }

  async balance(data: { wallet: string; balance: bigint; userId?: string; [params: string]: unknown }): Promise<void> {
    logger.debug(`Will send request to [ ${this.url} ]`);
    try {
      if (!data.wallet) {
        throw new Error('Missing wallet');
      }

      if (!data.balance) {
        throw new Error('Missing balance');
      }

      const { wallet, userId, balance, ...input } = data;

      await fetch(this.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKey,
        },
        body: JSON.stringify({
          ...input,
          balance: balance.toString(),
          walletAddress: wallet,
          userId: userId,
          type: WalletEvents.Balance,
          engage_inbound_source: 'sdk',
        }),
      });
    } catch (e: unknown) {
      logger.error(`There was an error sending request to [ ${this.url} ]`);
      throw e;
    }
  }
}
