# @aminnairi/jsonvalidator

A sane validator for your insane JSON data

[![NPM package version](https://badgen.net/npm/v/@aminnairi/jsonvalidator)](https://www.npmjs.com/package/@aminnairi/jsonvalidator) [![TypeScript typing included status](https://badgen.net/npm/types/@aminnairi/jsonvalidator)](https://github.com/aminnairi/javascript-jsonvalidator/blob/latest/sources/index.ts) [![Code coverage in percent](https://badgen.net/coveralls/c/github/aminnairi/javascript-jsonvalidator/latest)](https://coveralls.io/github/aminnairi/javascript-jsonvalidator) [![minified + gzipped package size](https://badgen.net/bundlephobia/minzip/@aminnairi/jsonvalidator)](https://bundlephobia.com/package/@aminnairi/jsonvalidator) [![tree-shaking support status](https://badgen.net/bundlephobia/tree-shaking/@aminnairi/jsonvalidator)](https://bundlephobia.com/package/@aminnairi/jsonvalidator) [![vulnerabilities count](https://badgen.net/snyk/aminnairi/javascript-jsonvalidator)](https://snyk.io/advisor/npm-package/@aminnairi/jsonvalidator)

## Summary

- [Usage](#usage)
- [Installation](#installation)
  - [Deno](#deno)
    - [ECMAScript Module](#ecmascript-module)
    - [TypeScript](#typescript)
  - [Node](#node)
    - [ECMAScript](#ecmascript)
    - [CommonJS](#commonjs)
    - [TypeScript](#typescript-1)
  - [Browser](#browser)
    - [Script](#script)
    - [ECMAScript Module](#ecmascript-module-1)
- [API](#api)
  - [validate](#validate)
  - [string](#string)
  - [number](#number)
  - [boolean](#boolean)
  - [nil](#nil)
  - [array](#array)
  - [object](#object)
  - [oneOf](#oneof)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Usage

```typescript
import {validate, array, object, property, string, number} from "@aminnairi/jsonvalidator";
const schema = array(object([
  property("id", number),
  property("languages", array(string))
]));

const data = [
  {id: 1, languages: ["javascript", "php", "python", "ruby"]},
  {id: 2, languages: ["haskell", "purescript", "elm", null]}
];

const validation = validate(schema, data);

if (validation.error) {
  console.error(validation.error);
}
```

```console
expected null to be of type String, at index 3 of [
  "haskell",
  "purescript",
  "elm",
  null
], for property languages of {
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

```typescript
import {validate, string} from "https://unpkg.com/@aminnairi/jsonvalidator?module";

const validation = validate(string, null);

if (validation.error) {
  console.error(validation.error);
}
```

[Back to summary](#summary)

#### TypeScript

```typescript
import {validate, string, Validation, Schema} from "https://unpkg.com/@aminnairi/jsonvalidator/index.ts";

const schema: Schema = string;
const validation: Validation = validate(schema, null);

if (validation.error) {
  console.error(validation.error):
}
```

[Back to summary](#summary)

### Node

```console
$ npm install @aminnairi/jsonvalidator
```

[Back to summary](#summary)

#### ECMAScript

```typescript
import jsonvalidator from "@aminnairi/jsonvalidator";

const {validate, string} = jsonvalidator;

const validation = validate(string, null);

if (validation.error) {
  console.error(validation.error);
}
```

[Back to summary](#summary)

#### CommonJS

```javascript
"use strict";

const {validate, string} = require("@aminnairi/jsonvalidator");

const validation = validate(string, null);

if (validation.error) {
  console.error(validation.error);
}
```

[Back to summary](#summary)

#### TypeScript

```typescript
import {validate, string} from "@aminnairi/jsonvalidator";

const validation = validate(string, null);

if (validation.error) {
  console.error(validation.error);
}
```

[Back to summary](#summary)

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

      const validation = validate(string, null);

      if (validation.error) {
        console.error(validation.error);
      }
    </script>
  </body>
</html>
```

[Back to summary](#summary)

#### ECMAScript Module

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module">
      import {validate, string} from "https://unpkg.com/@aminnairi/jsonvalidator?module";
      
      const validation = validate(string, null);

      if (validation.error) {
        console.error(validation.error);
      }
    </script>
  </body>
</html>
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

const schema = number;

const validation = validate(schema, "123");

if (validation.error) {
  console.error(validation.error);
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

const schema = string;

const validation = validate(schema, "string");

if (validation.error) {
  console.error(validation.error);
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

const schema = number;

const validation = validate(schema, 123);

if (validation.error) {
  console.error(validation.error);
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

const schema = boolean;

const validation = validate(schema, true);

if (validation.error) {
  console.error(validation.error);
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

const schema = nil;

const validation = validate(schema, null);

if (validation.error) {
  console.error(validation.error);
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

const schema = array(number);

const validation = validate(schema, [123, 456]);

if (validation.error) {
  console.error(validation.error);
}
```

```typescript
import {validate, array, index, number} from "@aminnairi/jsonvalidator";

const schema = array([index(0, string), index(1, number)]);

const validation = validate(schema, ["123", 456]);

if (validation.error) {
  console.error(validation.error);
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

const schema = object([property("x", number), property("y", number)]);

const validation = validate(schema, {x: 1, y: 2});

if (validation.error) {
  console.error(validation.error);
}
```

```typescript
import {validate, object, optionalProperty, string} from "@aminnairi/jsonvalidator";

const schema = object([optionalProperty("token", string)]);

const validation = validate(schema, {});

if (validation.error) {
  console.error(validation.error);
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

const schema = oneOf([number, string]);

const validation = validate(schema, 123);

if (validation.error) {
  console.error(validation.error);
}
```

```typescript
import {validate, oneOf, number, string} from "@aminnairi/jsonvalidator";

const schema = oneOf([array(string), string]);

const validation = validate(schema, ["123", "456"]);

if (validation.error) {
  console.error(validation.error);
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
