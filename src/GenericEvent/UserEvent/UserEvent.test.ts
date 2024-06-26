import { UserEvent } from './UserEvent';
import { Routes } from '../../lib/routes';
import { UserEvents } from './types';

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
    expect(obj['uri']).toBe(Routes.PUBLIC_ACTIVITY_V1);

    expect(obj['url']).toBeDefined();
    expect(obj['url']).toBeInstanceOf(URL);
    expect(obj['url'].host).toBe(host);
    expect(obj['url'].pathname).toBe(`/${Routes.PUBLIC_ACTIVITY_V1}`);
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

  it('Should send the proper signin request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      foo: 'bar',
      userId: '1234',
    };
    const expectedPayload = { foo: 'bar', user_id: '1234' };

    await obj.signIn(payload);

    const url = new URL(`${baseUrl}/${Routes.PUBLIC_ACTIVITY_V1}`);

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
          ...expectedPayload,
          type: UserEvents.SignIn,
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should send the proper signout request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const client = new UserEvent(baseUrl, apiKey);

    const payload = { foo: 'bar', userId: '1234' };
    const expectedPayload = { foo: 'bar', user_id: '1234' };

    await client.signOut(payload);

    const url = new URL(`${baseUrl}/${Routes.PUBLIC_ACTIVITY_V1}`);

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
          ...expectedPayload,
          type: UserEvents.SignOut,
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should send the proper signingUp request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const client = new UserEvent(baseUrl, apiKey);

    const payload = {
      foo: 'bar',
      userId: '1234', // optional
    };
    const expectedPayload = { foo: 'bar', user_id: '1234' };

    await client.signingUp(payload);

    const url = new URL(`${baseUrl}/${Routes.PUBLIC_ACTIVITY_V1}`);

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
          ...expectedPayload,
          type: UserEvents.SigningUp,
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should send the proper signedUp request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const client = new UserEvent(baseUrl, apiKey);

    const payload = { foo: 'bar', userId: '1234' };
    const expectedPayload = { foo: 'bar', user_id: '1234' };

    await client.signedUp(payload);

    const url = new URL(`${baseUrl}/${Routes.PUBLIC_ACTIVITY_V1}`);

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
          ...expectedPayload,
          type: UserEvents.SignedUp,
          engage_inbound_source: 'sdk',
        }),
      }),
    );
  });

  it('Should send the proper activity request', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const client = new UserEvent(baseUrl, apiKey);

    const payload = { foo: 'bar', userId: '1234' };
    const expectedPayload = { foo: 'bar', user_id: '1234' };

    await client.activity(payload);

    const url = new URL(`${baseUrl}/${Routes.PUBLIC_ACTIVITY_V1}`);

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
          ...expectedPayload,
          type: UserEvents.Activity,
          engage_inbound_source: 'sdk',
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
      await obj.signIn(payload);
    };

    await expect(objCall).rejects.toThrow(errorMessage);
  });

  it('Should throw if missing userId in signin', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    const objCall = async () => {
      await obj.signIn(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing userId');
  });

  it('Should throw if missing userId in activity', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    const objCall = async () => {
      await obj.activity(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing userId');
  });

  it('Should throw if missing userId in signout', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    const objCall = async () => {
      await obj.signOut(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing userId');
  });

  it('Should not throw if missing userId in signingUp', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    await obj.signingUp(payload as any); // evil dev

    await expect((global as any).fetch).toHaveBeenCalledTimes(1);
  });

  it('Should throw if missing userId in signedUp', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    const objCall = async () => {
      await obj.signedUp(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing userId');
  });

  it('Should throw if missing userId in signedUp', async () => {
    const host = 'localhost.localdomain';
    const baseUrl = `https://${host}`;
    const apiKey = 'abcd-efgh-1234-5678';
    const obj = new UserEvent(baseUrl, apiKey);

    const payload = {
      NOT_userId: '1234',
      fail: 'true',
    };

    const objCall = async () => {
      await obj.signedUp(payload as any); // evil dev
    };

    await expect(objCall).rejects.toThrow('Missing userId');
  });
});
