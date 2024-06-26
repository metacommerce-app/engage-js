import { Engage } from './Engage';
import { MissingApiKeyMessage } from '../lib/errors';

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
);

describe('Engage', () => {
  beforeEach(() => {
    (global as any).fetch.mockClear();
  });

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

  it('Should initialize and provide an events subcomponent', () => {
    const obj = new Engage();
    expect(obj).toBeInstanceOf(Engage);
    const apiKey = 'abcd-efgh-1234-5678';
    obj.initialize({ apiKey });

    expect(obj.events).toBeDefined();
    expect(obj.events).toHaveProperty('send');
  });

  it('should send a custom event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.send({
      type: 'test',
      iHaveProps: 'yes',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a signin event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.user.signIn({
      userId: '1234',
      wallet: '0x1234',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a signout event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.user.signOut({
      userId: '1234',
      wallet: '0x1234',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a signingUp event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.user.signingUp({
      user_id: '1234',
      wallet: '0x1234',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a signedUp event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.user.signedUp({
      userId: '1234',
      wallet: '0x1234',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a mint event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.wallet.mint({
      wallet: '0x1234',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a transfer event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.wallet.transfer({
      fromWallet: '0x1234',
      toWallet: '0x5678',
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(2);
    expect((global as any).fetch).not.toThrow();
  });

  it('should send a balance event', async () => {
    const client = new Engage();

    client.initialize({
      apiKey: 'abcd-efgh-1234-5678',
    });

    await client.events.wallet.balance({
      wallet: '0x1234',
      balance: BigInt(100),
      foo: 'bar',
    });

    expect((global as any).fetch).toHaveBeenCalledTimes(1);
    expect((global as any).fetch).not.toThrow();
  });
});
