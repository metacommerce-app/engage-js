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
import Engage from '@metacommerce-app/engage';

const engageSdk = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engageSdk.initialize({apiKey});
```

### Sending a custom event

```ts
import Engage from '@metacommerce-app/engage';

const engage = new Engage();
const apiKey = 'abcd-efgh-1234-5678';

engage.initialize({apiKey})

await engage.events.send({
    type: "MyCoolEvent", // required
    foo: "bar"
    hello: "world"
})

