# Unborn Name History

A library for getting Minecraft Java name history data after the removal of the public API. Do note that some values may be missing and some values will be estimates. You can identify these with the `accurate` field.

## Usage

### Javascript

```js
const { getNameHistory } = require('unborn-name-history')

getNameHistory('Notch').then(profile => {
    console.log(profile)
})
```

### Typescript

```ts
import { getNameHistory } from 'unborn-name-history'

const profile = await getNameHistory('Notch')
console.log(profile)
```
