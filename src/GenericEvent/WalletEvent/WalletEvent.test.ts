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

  it('Should send the proper transfer request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    await obj.transfer({
      fromWallet: '0x1234',
      toWallet: '0x5678',
      foo: 'bar',
    });

    const url = new URL(`${baseUrl}/${Routes.ACTIVITY_V1}`);

    expect((global as any).fetch).toHaveBeenCalledTimes(2);
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
          type: 'engage.events.wallet.transfer',
          walletAddress: '0x1234', // from
        }),
      }),
    );
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
          type: 'engage.events.wallet.received',
          walletAddress: '0x5678', // to
        }),
      }),
    );
  });

  it('Should throw if missing fromWallet in transfer', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      toWallet: '0x123456',
      fail: 'yes of course this will fail',
    };

    const objCall = async () => {
      await obj.transfer(payload as any); // evil dev
    };

    expect(objCall).rejects.toThrow('Missing fromWallet');
  });

  it('Should throw if missing toWallet in transfer', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      fromWallet: '0x123456',
      fail: 'yes of course this will fail',
    };

    const objCall = async () => {
      await obj.transfer(payload as any); // evil dev
    };

    expect(objCall).rejects.toThrow('Missing toWallet');
  });

  it('Should retry once if transfer fails and then succeed', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      toWallet: '0x123456',
      fromWallet: '0x567890',
      fail: 'yes of course this will fail',
    };

    (global as any).fetch.mockImplementationOnce(async () => {
      throw new Error('Failed to send request');
    });

    try {
      await obj.transfer(payload as any); // evil dev
    } catch (error) {
      // do nothing
    }

    expect((global as any).fetch).toHaveBeenCalledTimes(3);
  });

  it('Should retry once if transfer fails and then fail again', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      toWallet: '0x123456',
      fromWallet: '0x567890',
      fail: 'yes of course this will fail',
    };

    (global as any).fetch.mockImplementation(async () => {
      throw new Error('Failed to send request');
    });

    try {
      await obj.transfer(payload as any); // evil dev
    } catch (error) {
      // do nothing
    }

    expect((global as any).fetch).toHaveBeenCalledTimes(2);
  });
});
