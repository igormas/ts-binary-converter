/**
 * Supported input types for binary conversion
 */
export type BinaryInput = number | string | boolean | bigint;

/**
 * Options for toBinary conversion
 */
export interface ToBinaryOptions {
  /** Separator between bytes (default: ' ') */
  separator?: string;
  /** Number of bits per group (default: 8) */
  bits?: number;
}

/**
 * Options for fromBinary conversion
 */
export interface FromBinaryOptions {
  /** The output type to convert to (default: 'string') */
  outputType?: 'string' | 'number' | 'boolean';
  /** Separator used between bytes (default: ' ') */
  separator?: string;
}

/**
 * Converts a number to its binary representation.
 */
export function numberToBinary(value: number, options: ToBinaryOptions = {}): string {
  const { bits = 8 } = options;
  if (!Number.isInteger(value)) {
    throw new TypeError(`numberToBinary: value must be an integer, got ${value}`);
  }
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const binary = absValue.toString(2).padStart(bits, '0');
  return isNegative ? '-' + binary : binary;
}

/**
 * Converts a string to its binary representation.
 * Each character is converted to its UTF-16 code point.
 */
export function stringToBinary(value: string, options: ToBinaryOptions = {}): string {
  const { separator = ' ', bits = 8 } = options;
  return value
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(bits, '0'))
    .join(separator);
}

/**
 * Converts a boolean to its binary representation.
 */
export function booleanToBinary(value: boolean): string {
  return value ? '1' : '0';
}

/**
 * Converts a BigInt to its binary representation.
 */
export function bigintToBinary(value: bigint): string {
  const isNegative = value < 0n;
  const absValue = isNegative ? -value : value;
  return isNegative ? '-' + absValue.toString(2) : absValue.toString(2);
}

/**
 * Converts a value (number, string, boolean, or bigint) to binary.
 * @example
 * toBinary(65)        // '01000001'
 * toBinary('A')       // '01000001'
 * toBinary(true)      // '1'
 * toBinary(255n)      // '11111111'
 */
export function toBinary(value: BinaryInput, options: ToBinaryOptions = {}): string {
  if (typeof value === 'boolean') return booleanToBinary(value);
  if (typeof value === 'bigint') return bigintToBinary(value);
  if (typeof value === 'number') return numberToBinary(value, options);
  if (typeof value === 'string') return stringToBinary(value, options);
  throw new TypeError(`toBinary: unsupported type "${typeof value}"`);
}

/**
 * Converts a binary string back to a number.
 */
export function binaryToNumber(binary: string): number {
  const isNegative = binary.startsWith('-');
  const bin = isNegative ? binary.slice(1) : binary;
  if (!/^[01]+$/.test(bin)) {
    throw new TypeError(`binaryToNumber: invalid binary string "${binary}"`);
  }
  const value = parseInt(bin, 2);
  return isNegative ? -value : value;
}

/**
 * Converts a binary string back to a human-readable string.
 */
export function binaryToString(binary: string, separator: string = ' '): string {
  return binary
    .split(separator)
    .map((byte) => {
      if (!/^[01]+$/.test(byte)) {
        throw new TypeError(`binaryToString: invalid binary byte "${byte}"`);
      }
      return String.fromCharCode(parseInt(byte, 2));
    })
    .join('');
}

/**
 * Converts a binary string back to a boolean.
 */
export function binaryToBoolean(binary: string): boolean {
  if (binary === '1') return true;
  if (binary === '0') return false;
  throw new TypeError(`binaryToBoolean: expected '0' or '1', got "${binary}"`);
}

/**
 * Converts a binary string back to a BigInt.
 */
export function binaryToBigInt(binary: string): bigint {
  const isNegative = binary.startsWith('-');
  const bin = isNegative ? binary.slice(1) : binary;
  if (!/^[01]+$/.test(bin)) {
    throw new TypeError(`binaryToBigInt: invalid binary string "${binary}"`);
  }
  const value = BigInt('0b' + bin);
  return isNegative ? -value : value;
}

/**
 * Converts a binary string back to the specified output type.
 * @example
 * fromBinary('01000001')                           // 'A'
 * fromBinary('01000001', { outputType: 'number' }) // 65
 * fromBinary('1', { outputType: 'boolean' })       // true
 */
export function fromBinary(
  binary: string,
  options: FromBinaryOptions = {}
): string | number | boolean {
  const { outputType = 'string', separator = ' ' } = options;
  switch (outputType) {
    case 'number':
      return binaryToNumber(binary);
    case 'boolean':
      return binaryToBoolean(binary);
    case 'string':
    default:
      return binaryToString(binary, separator);
  }
}
