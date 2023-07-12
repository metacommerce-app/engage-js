export const MissingApiKeyMessage = 'An SDK API key is required and must not be empty.';

export class MissingApiKey extends Error {
  constructor() {
    super(MissingApiKeyMessage);
  }
}
