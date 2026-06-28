/**
 * Supported input types for binary conversion
 */
export type BinaryInput = ArrayBuffer | string | boolean;

/**
 * Options for toBinary conversion
 */
export interface ToBinaryOptions {
  /** Separator between bytes (default: ' ') */
  separator?: string;
}

/**
 * Options for fromBinary conversion
 */
export interface FromBinaryOptions {
  /** The output type to convert to (default: 'arraybuffer') */
  outputType?: 'arraybuffer' | 'string' | 'boolean';
  /** Separator used between bytes (default: ' ') */
  separator?: string;
}

/**
 * Converts an ArrayBuffer to its binary string representation.
 * Each byte is represented as an 8-bit binary number.
 * @param buffer - The ArrayBuffer to convert
 * @param options - Optional configuration
 * @returns Space-separated binary string representation of each byte
 */
export function arrayBufferToBinary(buffer: ArrayBuffer, options: ToBinaryOptions = {}): string {
  throw new Error('Not implemented');
}

/**
 * Converts a string to its binary representation.
 * The string is first encoded to UTF-8 bytes, then each byte is represented as 8-bit binary.
 * @param value - The string to convert
 * @param options - Optional configuration
 * @returns Space-separated binary string representation of each byte
 */
export function stringToBinary(value: string, options: ToBinaryOptions = {}): string {
  throw new Error('Not implemented');
}

/**
 * Converts a boolean to its binary representation.
 * @param value - The boolean to convert
 * @returns '1' for true, '0' for false
 */
export function booleanToBinary(value: boolean): string {
  throw new Error('Not implemented');
}

/**
 * Converts a value (ArrayBuffer, string, or boolean) to a binary string.
 * @param value - The value to convert
 * @param options - Optional configuration
 * @returns Binary string representation
 * @example
 * toBinary(new TextEncoder().encode('A').buffer)  // '01000001'
 * toBinary('A')                                   // '01000001'
 * toBinary(true)                                  // '1'
 */
export function toBinary(value: BinaryInput, options: ToBinaryOptions = {}): string {
  throw new Error('Not implemented');
}

/**
 * Converts a binary string back to an ArrayBuffer.
 * @param binary - Space-separated binary string (e.g. '01000001 01000010')
 * @param separator - The separator used between bytes (default: ' ')
 * @returns The decoded ArrayBuffer
 */
export function binaryToArrayBuffer(binary: string, separator: string = ' '): ArrayBuffer {
  throw new Error('Not implemented');
}

/**
 * Converts a binary string back to a UTF-8 string.
 * @param binary - Space-separated binary string (e.g. '01000001 01000010')
 * @param separator - The separator used between bytes (default: ' ')
 * @returns The decoded string
 */
export function binaryToString(binary: string, separator: string = ' '): string {
  throw new Error('Not implemented');
}

/**
 * Converts a binary string back to a boolean.
 * @param binary - '1' for true, '0' for false
 * @returns The boolean value
 */
export function binaryToBoolean(binary: string): boolean {
  throw new Error('Not implemented');
}

/**
 * Converts a binary string back to the specified output type.
 * @param binary - Binary string to convert
 * @param options - Options for conversion output type and separator
 * @returns The converted value
 * @example
 * fromBinary('01000001')                                 // ArrayBuffer (bytes for 'A')
 * fromBinary('01000001', { outputType: 'string' })       // 'A'
 * fromBinary('1', { outputType: 'boolean' })             // true
 */
export function fromBinary(
  binary: string,
  options: FromBinaryOptions = {}
): ArrayBuffer | string | boolean {
  throw new Error('Not implemented');
}
