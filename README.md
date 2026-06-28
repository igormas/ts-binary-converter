# ts-binary-converter

A lightweight, zero-dependency TypeScript library for converting values to binary and back. Supports **ArrayBuffer**, **strings**, and **booleans**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## Features

- Convert **ArrayBuffer**, **strings**, and **booleans** to a binary string
- Convert binary strings back to **ArrayBuffer**, **string**, or **boolean**
- Fully typed with TypeScript — no `any`
- Configurable byte separator
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

// ArrayBuffer → binary (each byte as 8-bit string, space-separated)
const buf = new TextEncoder().encode('Hi').buffer;
toBinary(buf);           // '01001000 01101001'

// String → binary
toBinary('Hi');          // '01001000 01101001'

// Boolean → binary
toBinary(true);          // '1'
toBinary(false);         // '0'

// Binary → ArrayBuffer (default)
fromBinary('01001000 01101001');
// → ArrayBuffer containing bytes for 'Hi'

// Binary → string
fromBinary('01001000 01101001', { outputType: 'string' });  // 'Hi'

// Binary → boolean
fromBinary('1', { outputType: 'boolean' });  // true
```

---

## API

### `toBinary(value, options?)`

Converts a value to its binary string representation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `ArrayBuffer \| string \| boolean` | The value to convert |
| `options.separator` | `string` | Separator between bytes (default: `' '`) |

**Returns:** `string`

---

### `fromBinary(binary, options?)`

Converts a binary string back to the specified type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `binary` | `string` | The binary string to convert |
| `options.outputType` | `'arraybuffer' \| 'string' \| 'boolean'` | Target type (default: `'arraybuffer'`) |
| `options.separator` | `string` | Separator used between bytes (default: `' '`) |

**Returns:** `ArrayBuffer | string | boolean`

---

### Individual helpers

| Function | Description |
|----------|-------------|
| `arrayBufferToBinary(buffer, options?)` | Converts an ArrayBuffer to a binary string |
| `stringToBinary(value, options?)` | Converts a string to a binary string (UTF-8 encoded) |
| `booleanToBinary(value)` | Converts a boolean to `'1'` or `'0'` |
| `binaryToArrayBuffer(binary, separator?)` | Decodes a binary string to an ArrayBuffer |
| `binaryToString(binary, separator?)` | Decodes a binary string to a UTF-8 string |
| `binaryToBoolean(binary)` | Parses `'1'`/`'0'` to a boolean |

---

## Examples

### Custom separator

```ts
import { toBinary, fromBinary } from 'ts-binary-converter';

const bin = toBinary('AB', { separator: '-' });  // '01000001-01000010'
fromBinary(bin, { separator: '-', outputType: 'string' });  // 'AB'
```

### Working with raw bytes

```ts
import { arrayBufferToBinary, binaryToArrayBuffer } from 'ts-binary-converter';

const buffer = new Uint8Array([0xff, 0x00, 0x7f]).buffer;
const binary = arrayBufferToBinary(buffer);  // '11111111 00000000 01111111'
const back   = binaryToArrayBuffer(binary);  // ArrayBuffer [0xff, 0x00, 0x7f]
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
