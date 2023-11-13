import { logger } from '../lib/logging';
import { MissingApiKey } from '../lib/errors';
import { IEngageSubComponent } from './EngageSubComponent';
import { GenericEvent } from '../GenericEvent';
import { Routes } from '../lib/routes';

export class Engage {
  private apiKey?: string;
  private url?: string;

  events!: IEngageSubComponent;

  initialize(options: { apiKey: string; url?: string }): void {
    if (!options.apiKey) {
      throw new MissingApiKey();
    }
    this.apiKey = options.apiKey;
    this.url = options?.url ?? 'https://rest.metacommerce.app';

    const engage_inbound_source = 'public-api';
    const defautlMode = 'public'; // options?.mode ?? 'public'; --> FIXME: will be available soon fellow devs
    const uri = defautlMode === 'public' ? Routes.PUBLIC_ACTIVITY_V1 : Routes.PRIVATE_ACTIVITY_V1;

    const re = /(\w{3}).*/;
    logger.debug(`initialize: API Key starts with [ ${this.apiKey?.replace(re, '$1...........')} ]`);
    logger.debug(`initialize: URL will be [ ${this.url} ]`);

    this.events = new GenericEvent(this.url, this.apiKey, uri, engage_inbound_source);
  }
}
