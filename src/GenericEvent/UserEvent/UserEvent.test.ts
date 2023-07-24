import { UserEvent } from './UserEvent';
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
    const obj = new UserEvent(baseUrl, apiKey);

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
    const obj = new UserEvent(baseUrl, apiKey, customUri);

    expect(obj['apiKey']).toBeDefined();
    expect(obj['apiKey']).toBe(apiKey);

    expect(obj['uri']).toBeDefined();
    expect(obj['uri']).toBe(customUri);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBeInstanceOf(URL);
    expect(obj['url'].host).toBe(host);
    expect(obj['url'].pathname).toBe(`/${customUri}`);
  });

  it('Should send the proper request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      userId: '1234',
      foo: 'bar',
    };

    await obj.login(payload);

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
          ...payload,
          type: 'engage.events.user.login',
        }),
      }),
    );
  });

  it('Should throw if send has an issue', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      userId: '1234',
      fail: 'true',
    };

    const errorMessage = 'API is down';
    (global as any).fetch.mockImplementationOnce(async () => {
      throw new Error(errorMessage);
    });

    const objCall = async () => {
      await obj.login(payload);
    };

    expect(objCall).rejects.toThrow(errorMessage);
  });
});
