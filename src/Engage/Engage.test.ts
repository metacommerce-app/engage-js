import { Engage } from './Engage';
import { MissingApiKeyMessage } from '../lib/errors';

describe('Engage', () => {
  it('Should initialize the API key with the default URL', () => {
    const obj = new Engage();
    expect(obj).toBeInstanceOf(Engage);
    const apiKey = 'abcd-efgh-1234-5678';
    obj.initialize({ apiKey });

    expect(obj['apiKey']).toBeDefined();
    expect(obj['apiKey']).toBe(apiKey);

    expect(obj['url']).toBeDefined();
    expect(typeof obj['url'] === 'string').toBe(true);
    expect(obj['url']?.startsWith('https://')).toBe(true);
  });

  it('Should throw when the SDK API key is empty', () => {
    const obj = new Engage();
    expect(obj).toBeInstanceOf(Engage);
    const apiKey = '';
    const t = () => {
      obj.initialize({ apiKey });
    };
    expect(t).toThrowError(MissingApiKeyMessage);
  });

  it('Should initialize the API key and URL', () => {
    const obj = new Engage();
    expect(obj).toBeInstanceOf(Engage);
    const apiKey = 'abcd-efgh-1234-5678';
    const newUrl = 'https://some.domain.app';
    obj.initialize({ apiKey, url: newUrl });

    expect(obj['apiKey']).toBeDefined();
    expect(obj['apiKey']).toBe(apiKey);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBe(newUrl);
  });
});
