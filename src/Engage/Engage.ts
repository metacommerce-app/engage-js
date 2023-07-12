import { logger } from '../lib/logging';

export class Engage {
  private apiKey?: string;
  private url?: string;

  initialize(apiKey: string, options?: { url?: string }): void {
    this.apiKey = apiKey;
    const re = /(\w{3}).*/;
    logger.debug(`initialize: API Key starts with [ ${this.apiKey?.replace(re, '$1...........')} ]`);
    this.url = options?.url ?? 'https://rest.metacommerce.app';
    logger.debug(`initialize: URL will be [ ${this.url} ]`);
  }
}
