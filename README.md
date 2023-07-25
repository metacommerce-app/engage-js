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

```ts
import Engage from '@metacommerce-app/engage-js';

const engageSdk = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engageSdk.initialize({ apiKey });
```
## Custom events

## Custom events

### Sending a custom event

```ts
import Engage from '@metacommerce-app/engage-js';

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

### Sending a login event

```ts
import Engage from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.login({
  userId: '1234', // required
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

### Sending a logout event

```ts
import Engage from '@metacommerce-app/engage-js';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({ apiKey });

await engage.events.user.logout({
  userId: '1234', // required
  wallet: '0x1234', // optional
  foo: 'bar',
});
```

### Sending a signingUp event

```ts
import Engage from '@metacommerce-app/engage-js';

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

```ts
import Engage from '@metacommerce-app/engage-js';

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

```ts
import Engage from '@metacommerce-app/engage-js';

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

```ts
import Engage from '@metacommerce-app/engage-js';

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

```ts
import Engage from '@metacommerce-app/engage-js';

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
