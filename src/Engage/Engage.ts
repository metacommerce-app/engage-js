import { logger } from '../lib/logging';
import { MissingApiKey } from '../lib/errors';
import { IEngageSubComponent } from './EngageSubComponent';
import { GenericEvent } from '../GenericEvent';

export class Engage {
  private apiKey?: string;
  private url?: string;

  events!: IEngageSubComponent;

  initialize(options: { apiKey: string; url?: string }): void {
    if (!options.apiKey) {
      throw new MissingApiKey();
    }
    this.apiKey = options.apiKey;
    const re = /(\w{3}).*/;
    logger.debug(`initialize: API Key starts with [ ${this.apiKey?.replace(re, '$1...........')} ]`);
    this.url = options?.url ?? 'https://rest.metacommerce.app';
    logger.debug(`initialize: URL will be [ ${this.url} ]`);

    this.events = new GenericEvent(this.url, this.apiKey);
  }
}
