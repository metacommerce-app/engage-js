import { IEngageWalletComponent } from '../../Engage/EngageSubComponent';
import { logger } from '../../lib/logging';
import { Routes } from '../../lib/routes';

export class WalletEvent implements IEngageWalletComponent {
  private uri: string;
  private url: URL;
  private apiKey: string;

  constructor(host: string, apiKey: string, uri?: string) {
    this.apiKey = apiKey;
    this.uri = uri ?? Routes.ACTIVITY_V1;
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
          type: 'engage.events.wallet.mint',
          walletAddress: wallet,
          userId: userId,
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
          type: 'engage.events.wallet.transfer',
          walletAddress: fromWallet,
          userId: userId,
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
          type: 'engage.events.wallet.received',
          walletAddress: toWallet,
          userId: userId,
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
}
