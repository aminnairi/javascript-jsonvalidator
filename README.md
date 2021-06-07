# @aminnairi/jsonvalidator

A sane validator for your insane JSON data

[![Test](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/test.yaml/badge.svg)](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/test.yaml) [![Types](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/types.yaml/badge.svg)](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/types.yaml) [![Build](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/build.yaml/badge.svg)](https://github.com/aminnairi/javascript-jsonvalidator/actions/workflows/build.yaml) [![minified + gzipped package size](https://badgen.net/bundlephobia/minzip/@aminnairi/jsonvalidator)](https://bundlephobia.com/package/@aminnairi/jsonvalidator@0.1.0) [![tree-shaking support status](https://badgen.net/bundlephobia/tree-shaking/@aminnairi/jsonvalidator)](https://bundlephobia.com/package/@aminnairi/jsonvalidator@0.1.0)

## Summary

- [Summary](#summary)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Node](#node)
    - [ECMAScript](#ecmascript)
    - [CommonJS](#commonjs)
    - [TypeScript](#typescript)
  - [Browser](#browser)
    - [Script](#script)
    - [ECMAScript Module](#ecmascript-module)
- [Uninstallation](#uninstallation)
- [Usage](#usage)
- [API](#api)
  - [validate](#validate)
  - [string](#string)
  - [number](#number)
  - [boolean](#boolean)
  - [nil](#nil)
  - [array](#array)
  - [object](#object)
  - [oneOf](#oneof)
- [Examples](#examples)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [Node](https://nodejs.org/)

[Back to summary](#summary)

## Usage

```typescript
try {
  const schema = array(object([
    property("id", number),
    property("languages", array(string))
  ]));
  
  const data = [
    {id: 1, languages: ["javascript", "php", "python", "ruby"]},
    {id: 2, languages: ["haskell", "purescript", "elm", null]}
  ];
  
  validate(schema, data);
} catch (error) {
  console.error(error.message);
}
```

```console
expected null to be of type "string", at index 3 of [
  "haskell",
  "purescript",
  "elm",
  null
], for property "languages" of {
  "id": 2,
  "languages": [
    "haskell",
    "purescript",
    "elm",
    null
  ]
}, at index 1 of [
  {
    "id": 1,
    "languages": [
      "javascript",
      "php",
      "python",
      "ruby"
    ]
  },
  {
    "id": 2,
    "languages": [
      "haskell",
      "purescript",
      "elm",
      null
    ]
  }
]
```

[Back to summary](#summary)

## Installation

### Deno

#### ECMAScript Module

```console
$ touch index.js
```

```typescript
import {validate, string} from "https://unpkg.com/@aminnairi/jsonvalidator?module";

try {
  validate(string, null);
} catch (error) {
  console.error(error.message);
}
```

#### TypeScript

```console
$ touch index.ts
```

```typescript
import {validate, string} from "https://unpkg.com/@aminnairi/jsonvalidator/index.ts";

try {
  validate(string, null);
} catch (error) {
  console.error(error.message);
}
```

### Node

```console
$ npm install @aminnairi/jsonvalidator
```

#### ECMAScript

```console
$ touch index.mjs
```

```typescript
import jsonvalidator from "@aminnairi/jsonvalidator";

const {validate, string} = jsonvalidator;

try {
  validate(string, null);
} catch (error) {
  console.error(error.message);
}
```

```console
$ node index.mjs
expected null to be of type "string"
```

#### CommonJS

```console
$ touch index.js
```

```javascript
"use strict";

const {validate, string} = require("@aminnairi/jsonvalidator");

try {
  validate(string, null);
} catch (error) {
  console.error(error.message);
}
```

```console
$ node index.js
expected null to be of type "string"
```

#### TypeScript

```console
$ touch index.ts
```

```typescript
import {validate, string} from "@aminnairi/jsonvalidator";

try {
  validate(string, null);
} catch (error) {
  console.error(error.message);
}
```

```console
$ npx ts-node index.ts
expected null to be of type "string"
```

### Browser

#### Script

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="https://unpkg.com/@aminnairi/jsonvalidator"></script>
    <script>
      "use strict";
      
      const {validate, string} = window.aminnairi.jsonvalidator;

      try {
        validate(string, null);
      } catch (error) {
        console.error(error.message);
      }
    </script>
  </body>
</html>
```

#### ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import {validate, string} from "https://unpkg.com/@aminnairi/jsonvalidator?module";
      
      try {
        validate(string, null);
      } catch (error) {
        console.error(error.message);
      }
    </script>
  </body>
</html>
```

[Back to summary](#summary)

## Uninstallation

```console
$ npm uninstall @aminnairi/jsonvalidator
```

[Back to summary](#summary)

## API

### validate

Check that an input is valid according to a given schema. Throws an error if it does not.

```typescript
export const validate = <Input>(schema: Schema, input: Input): Input;
```

```typescript
import {validate, number} from "@aminnairi/jsonvalidator";

try {
  validate(number, "123");
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### string

Schema for a string.

```typescript
export const string: StringSchema;
```

```typescript
import {validate, string} from "@aminnairi/jsonvalidator";

try {
  validate(string, "string");
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### number

Schema for a number.

```typescript
export const number: NumberSchema;
```

```typescript
import {validate, number} from "@aminnairi/jsonvalidator";

try {
  validate(number, 123);
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### boolean

Schema for a boolean.

```typescript
export const boolean: BooleanSchema;
```

```typescript
import {validate, boolean} from "@aminnairi/jsonvalidator";

try {
  validate(boolean, true);
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### nil

Schema for null values.

```typescript
export const nil: NullSchema = {
```

```typescript
import {validate, nil} from "@aminnairi/jsonvalidator";

try {
  validate(nil, null);
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### array

Schema for an array. It accepts either another schema or an array of index schema. An index schema is a special schema that only works for arrays and can validate data for a wanted array index.

```typescript
export const array = (schema: Schema | Array<IndexSchema>): ArraySchema;
export const index = (i: number, schema: Schema): IndexSchema;
```

```typescript
import {validate, array, number} from "@aminnairi/jsonvalidator";

try {
  validate(array(number), [123, 456]);
} catch (error) {
  console.error(error.message);
}
```

```typescript
import {validate, array, index, number} from "@aminnairi/jsonvalidator";

try {
  validate(array([index(0, string), index(1, number)]), ["123", 456]);
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### object

Schema for an object. It accepts an array of property schema or optional property schema. A property schema is a special schema that allows the validation of a data for a wanted property. An optional property schema is similar to a property schema, except the data can be missing. A missing data is simply a data that is not present in the JSON data. Null values are not considered missing data.

```typescript
export const object = (properties: Array<PropertySchema | OptionalPropertySchema>): ObjectSchema;
export const property = (key: string, schema: Schema): PropertySchema;
export const optionalProperty = (key: string, schema: Schema): OptionalPropertySchema;
```

```typescript
import {validate, object, property, number} from "@aminnairi/jsonvalidator";

try {
  validate(object([property("x", number), property("y", number)]), {x: 1, y: 2});
} catch (error) {
  console.error(error.message);
}
```

```typescript
import {validate, object, optionalProperty, string} from "@aminnairi/jsonvalidator";

try {
  validate(object([optionalProperty("token", string)]), {});
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

### oneOf

Schema for validating multiple possible schema for one data. It accepts an array of schema, excepted the special schemas mentioned above.

```typescript
export const oneOf = (schemas: Array<Schema>): OneOfSchema;
```

```typescript
import {validate, oneOf, number, string} from "@aminnairi/jsonvalidator";

try {
  validate(oneOf([number, string]), 123);
} catch (error) {
  console.error(error.message);
}
```

```typescript
import {validate, oneOf, number, string} from "@aminnairi/jsonvalidator";

try {
  validate(oneOf([array(string), string]), ["123", "456"]);
} catch (error) {
  console.error(error.message);
}
```

[Back to summary](#summary)

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

[Back to summary](#summary)

## Contributing

See [`CONTRIBUGING.md`](./CONTRIBUTING.md).

[Back to summary](#summary)

## License

See [`LICENSE`](./LICENSE).

[Back to summary](#summary)
