# ts-binary-converter

A lightweight, zero-dependency TypeScript library for converting values to binary and back. Supports **numbers**, **strings**, **booleans**, and **BigInt**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## Features

- Convert **numbers**, **strings**, **booleans**, and **BigInt** values to binary
- Convert binary strings back to the original type
- Fully typed with TypeScript — no `any`
- Configurable bit width and byte separator
- Handles negative numbers and BigInts
- Comprehensive test suite with Jest

---

## Installation

```bash
npm install ts-binary-converter
```

---

## Quick Start

```ts
import { toBinary, fromBinary } from 'ts-binary-converter';

// Number → binary
toBinary(65);          // '01000001'
toBinary(-3);          // '-00000011'

// String → binary (each char as 8-bit byte, space-separated)
toBinary('Hi');        // '01001000 01101001'

// Boolean → binary
toBinary(true);        // '1'
toBinary(false);       // '0'

// BigInt → binary
toBinary(255n);        // '11111111'

// Binary → string (default)
fromBinary('01001000 01101001');              // 'Hi'

// Binary → number
fromBinary('01000001', { outputType: 'number' });   // 65

// Binary → boolean
fromBinary('1', { outputType: 'boolean' });          // true
```

---

## API

### `toBinary(value, options?)`

Converts a value to its binary string representation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `number \| string \| boolean \| bigint` | The value to convert |
| `options.bits` | `number` | Bit-width per group (default: `8`) |
| `options.separator` | `string` | Separator between bytes for strings (default: `' '`) |

**Returns:** `string`

---

### `fromBinary(binary, options?)`

Converts a binary string back to the specified type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `binary` | `string` | The binary string to convert |
| `options.outputType` | `'string' \| 'number' \| 'boolean'` | Target type (default: `'string'`) |
| `options.separator` | `string` | Separator used between bytes (default: `' '`) |

**Returns:** `string | number | boolean`

---

### Individual helpers

| Function | Description |
|----------|-------------|
| `numberToBinary(value, options?)` | Converts an integer to binary |
| `stringToBinary(value, options?)` | Converts a string to space-separated binary bytes |
| `booleanToBinary(value)` | Converts a boolean to `'1'` or `'0'` |
| `bigintToBinary(value)` | Converts a BigInt to binary |
| `binaryToNumber(binary)` | Parses a binary string to a number |
| `binaryToString(binary, separator?)` | Decodes binary bytes to a string |
| `binaryToBoolean(binary)` | Parses `'1'`/`'0'` to boolean |
| `binaryToBigInt(binary)` | Parses a binary string to a BigInt |

---

## Examples

### Custom bit width

```ts
import { toBinary } from 'ts-binary-converter';

toBinary(5, { bits: 4 });   // '0101'
toBinary(5, { bits: 16 });  // '0000000000000101'
```

### Custom separator

```ts
import { toBinary, fromBinary } from 'ts-binary-converter';

const bin = toBinary('AB', { separator: '-' });  // '01000001-01000010'
fromBinary(bin, { separator: '-' });              // 'AB'
```

### BigInt round-trip

```ts
import { toBinary, binaryToBigInt } from 'ts-binary-converter';

const bin = toBinary(9007199254740993n);  // '100000000000000000000000000000000000000000000000000001'
binaryToBigInt(bin);                      // 9007199254740993n
```

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

---

## License

[MIT](./LICENSE)
