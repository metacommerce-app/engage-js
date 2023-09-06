# engage-js

Javascript SDK for the Engage platform. More to come.

## Install the SDK

```
yarn add @metacommerce-app/engage
```

or if using npm

```
npm install @metacommerce-app/engage
```

## Getting started

Engage-js has two SDKs, one public (EngageWeb) and one private (Engage). Both SDKs are initialized the same way, but the private SDK requires a Private API key and the public SDK requires a Public API key. You can get both keys from the Engage platform. The public SDK incorporates extra security measures as it is meant to be used in a frontend environment.

### Initialize the Private SDK

The Private SDK is used to send events to the Engage platform. It requires a Private API key to be initialized. This SDK is meant to be used in a backend environment.

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engageSdk = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engageSdk.initialize({ apiKey });
```

### Initialize the Public SDK

The Public SDK is used to retrieve data from the Engage platform. It requires a Public API key to be initialized. This SDK is meant to be used in a frontend environment.

```ts
import { EngageWeb } from '@metacommerce-app/engage-js';

const engageWebSdk = new EngageWeb();
const apiKey = 'abcd-efgh-1234-5678';

engageWebSdk.initialize({ apiKey });
```

## Custom events

### Sending a custom event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({apiKey})

await engage.events.send({
    type: "MyCoolEvent", // required
    foo: "bar"
    hello: "world"
})
```

## User events

### Sending a signin event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.signin({
  userId: '1234', // required
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

### Sending a signout event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.signout({
  userId: '1234', // required
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

### Sending a signingUp event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.signingUp({
  userId: '1234', // optional
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

### Sending a signedUp event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.signedUp({
  userId: '1234', // required
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

## Wallet events

### Sending a mint event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.wallet.mint({
  wallet: '0x1234', // required
  userId: '1234', // optional
  foo: 'bar',
});
```

### Sending a transfer event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.wallet.transfer({
  fromWallet: '0x1234', // required
  toWallet: '0x5678', // required
  userId: '1234', // optional
  foo: 'bar',
});
```

### Sending a balance event

Note: works with both public and private SDKs

```ts
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.wallet.balance({
  wallet: '0x1234', // required
  balance: BigInt(100), // required
  userId: '1234', // optional
  foo: 'bar',
});
```
