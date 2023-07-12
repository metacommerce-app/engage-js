import { MissingApiKeyMessage, MissingApiKey } from './MissingApiKey';

describe('Missing API Key', () => {
  it('Should be an exception with a specific message', () => {
    const e = new MissingApiKey();
    expect(e).toBeDefined();
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe(MissingApiKeyMessage);
  });
});
