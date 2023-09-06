import { WalletEvent } from './WalletEvent';
import { Routes } from '../../lib/routes';
import { WalletEvents } from './types';

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
    expect(obj['uri']).toBe(Routes.PRIVATE_ACTIVITY_V1);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBeInstanceOf(URL);
    expect(obj['url'].host).toBe(host);
    expect(obj['url'].pathname).toBe(`/${Routes.PRIVATE_ACTIVITY_V1}`);
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

    const url = new URL(`${baseUrl}/${Routes.PRIVATE_ACTIVITY_V1}`);

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
          type: WalletEvents.Mint,
          walletAddress: '0x1234',
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should send the proper activity request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    await obj.activity({
      wallet: '0x1234',
      foo: 'bar',
    });

    const url = new URL(`${baseUrl}/${Routes.PRIVATE_ACTIVITY_V1}`);

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
          type: WalletEvents.Activity,
          walletAddress: '0x1234',
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should throw if missing wallet in activity', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      NOT_wallet: 'I am not a wallet',
      fail: 'yes of course this will fail',
    };

    const objCall = async () => {
      await obj.activity(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing wallet');
  });

  it('Should send the proper transaction request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    await obj.transaction({
      wallet: '0x1234',
      foo: 'bar',
    });

    const url = new URL(`${baseUrl}/${Routes.PRIVATE_ACTIVITY_V1}`);

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
          type: WalletEvents.Transaction,
          walletAddress: '0x1234',
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should throw if missing wallet in transaction', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new WalletEvent(baseUrl, apiKey);

    const payload = {
      NOT_wallet: 'I am not a wallet',
      fail: 'yes of course this will fail',
    };

    const objCall = async () => {
      await obj.transaction(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing wallet');
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

    await expect(objCall).rejects.toThrow('Missing wallet');
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

    const url = new URL(`${baseUrl}/${Routes.PRIVATE_ACTIVITY_V1}`);

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
          walletAddress: '0x1234', // from
          type: WalletEvents.Transfer,
          engage_inbound_source: 'sdk',
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
          walletAddress: '0x5678', // to
          type: WalletEvents.Received,
          engage_inbound_source: 'sdk',
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

    await expect(objCall).rejects.toThrow('Missing fromWallet');
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

    await expect(objCall).rejects.toThrow('Missing toWallet');
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

    (global as any).fetch.mockImplementationOnce(async () => {
      throw new Error('Failed to send request');
    });
    (global as any).fetch.mockImplementationOnce(async () => {
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

it('Should send the proper balance request', async () => {
  (global as any).fetch.mockClear();
  const host = 'localhost.localdomain';
  const baseUrl = `https://${host}`;
  const apiKey = 'abcd-efgh-1234-5678';
  const obj = new WalletEvent(baseUrl, apiKey);

  await obj.balance({
    wallet: '0x1234',
    balance: BigInt(100),
    foo: 'bar',
  });

  const url = new URL(`${baseUrl}/${Routes.PRIVATE_ACTIVITY_V1}`);

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
        balance: BigInt(100).toString(),
        walletAddress: '0x1234',
        type: WalletEvents.Balance,
        engage_inbound_source: 'sdk',
      }),
    }),
  );
});

it('Should throw if missing wallet in balance', async () => {
  const host = 'localhost.localdomain';
  const baseUrl = `https://${host}`;
  const apiKey = 'abcd-efgh-1234-5678';
  const obj = new WalletEvent(baseUrl, apiKey);

  const payload = {
    NOT_wallet: 'I am not a wallet',
    fail: 'yes of course this will fail',
  };

  const objCall = async () => {
    await obj.balance(payload as any); // evil dev
  };

  await expect(objCall).rejects.toThrow('Missing wallet');
});

it('Should throw if missing balance in balance', async () => {
  const host = 'localhost.localdomain';
  const baseUrl = `https://${host}`;
  const apiKey = 'abcd-efgh-1234-5678';
  const obj = new WalletEvent(baseUrl, apiKey);

  const payload = {
    wallet: 'I am a wallet',
    NOT_balance: 'I am not a balance',
    fail: 'yes of course this will fail',
  };

  const objCall = async () => {
    await obj.balance(payload as any); // evil dev
  };

  await expect(objCall).rejects.toThrow('Missing balance');
});
