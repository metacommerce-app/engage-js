# Engage-js

Engage-js is a powerful JavaScript SDK for the Engage platform. This document will guide you through the process of integrating it into your frontend application.

## Installation

You can install the SDK using npm:

```bash
npm install @metacommerce-app/engage-js
```

or yarn:

```bash
yarn add @metacommerce-app/engage-js
```

## Getting started

Engage-js provides a public SDK, which is designed to be used in a frontend environment. It requires a Public API key, which you can obtain from the [Engage platform](https://engage.metacommerce.app/):

### Initializing the SDK

Once you have the Public API key, you can initialize the SDK:

```TypeScript
import { Engage } from '@metacommerce-app/engage-js';

const engage = new Engage();

engage.initialize({ apiKey: "your_public_api_key" });
```

### Tracking custom events

You can track events using the `track` method. If you don't specify the `type` property, the SDK will throw an error.

```TypeScript
await engage.events.send({
    type: "MyCoolEvent", // required
    foo: "bar"
    hello: "world"
})
```

## More events

To make your dev life easier, we have created a set of predefined events that you can use to track user behavior.

Visit our [documentation page](https://engage.metacommerce.app/docs) to learn more about the events that are available.
