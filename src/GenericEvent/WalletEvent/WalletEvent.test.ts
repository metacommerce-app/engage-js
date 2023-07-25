import { WalletEvent } from './WalletEvent';
import { Routes } from '../../lib/routes';

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
);

describe('User Event', () => {
  beforeEach(() => {
    (global as any).fetch.mockClear();
  });

  it('Should initialize the API key with the default URI', () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    expect(obj['apiKey']).toBeDefined();
    expect(obj['apiKey']).toBe(apiKey);

    expect(obj['uri']).toBeDefined();
    expect(obj['uri']).toBe(Routes.ACTIVITY_V1);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBeInstanceOf(URL);
    expect(obj['url'].host).toBe(host);
    expect(obj['url'].pathname).toBe(`/${Routes.ACTIVITY_V1}`);
  });

  it('Should initialize the API key with the custom URI', () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const customUri = 'test/uri';
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey, customUri);

    expect(obj['apiKey']).toBeDefined();
    expect(obj['apiKey']).toBe(apiKey);

    expect(obj['uri']).toBeDefined();
    expect(obj['uri']).toBe(customUri);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBeInstanceOf(URL);
    expect(obj['url'].host).toBe(host);
    expect(obj['url'].pathname).toBe(`/${customUri}`);
  });

  it('Should send the proper mint request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    await obj.mint({
      wallet: '0x1234',
      foo: 'bar',
    });

    const url = new URL(`${baseUrl}/${Routes.ACTIVITY_V1}`);

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
        body: JSON.stringify({
          foo: 'bar',
          type: 'engage.events.wallet.mint',
          walletAddress: '0x1234',
        }),
      }),
    );
  });

  it('Should throw if missing wallet in mint', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      NOT_wallet: 'I am not a wallet',
      fail: 'yes of course this will fail',
    };

    const objCall = async () => {
      await obj.mint(payload as any); // evil dev
    };

    expect(objCall).rejects.toThrow('Missing wallet');
  });
});
