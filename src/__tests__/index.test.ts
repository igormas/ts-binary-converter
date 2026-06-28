import {
  toBinary,
  fromBinary,
  arrayBufferToBinary,
  stringToBinary,
  booleanToBinary,
  binaryToArrayBuffer,
  binaryToString,
  binaryToBoolean,
} from '../index';

// Helper: create an ArrayBuffer from an array of byte values
function bufferOf(...bytes: number[]): ArrayBuffer {
  return new Uint8Array(bytes).buffer;
}

// Helper: compare two ArrayBuffers byte-by-byte
function buffersEqual(a: ArrayBuffer, b: ArrayBuffer): boolean {
  if (a.byteLength !== b.byteLength) return false;
  const ua = new Uint8Array(a);
  const ub = new Uint8Array(b);
  return ua.every((byte, i) => byte === ub[i]);
}

// ─── toBinary ────────────────────────────────────────────────────────────────

describe('toBinary', () => {
  describe('ArrayBuffer', () => {
    it('converts a single-byte buffer to 8-bit binary', () => {
      expect(toBinary(bufferOf(0x41))).toBe('01000001'); // 'A' = 0x41
    });

    it('converts a multi-byte buffer with default space separator', () => {
      expect(toBinary(bufferOf(0x41, 0x42))).toBe('01000001 01000010'); // 'AB'
    });

    it('converts an empty buffer to an empty string', () => {
      expect(toBinary(bufferOf())).toBe('');
    });

    it('respects custom separator', () => {
      expect(toBinary(bufferOf(0x41, 0x42), { separator: '-' })).toBe('01000001-01000010');
    });
  });

  describe('string', () => {
    it('converts a single ASCII character', () => {
      expect(toBinary('A')).toBe('01000001');
    });

    it('converts a multi-character string with default separator', () => {
      expect(toBinary('AB')).toBe('01000001 01000010');
    });

    it('converts an empty string to an empty string', () => {
      expect(toBinary('')).toBe('');
    });

    it('respects custom separator', () => {
      expect(toBinary('AB', { separator: '-' })).toBe('01000001-01000010');
    });
  });

  describe('boolean', () => {
    it('converts true to "1"', () => {
      expect(toBinary(true)).toBe('1');
    });

    it('converts false to "0"', () => {
      expect(toBinary(false)).toBe('0');
    });
  });
});

// ─── fromBinary ──────────────────────────────────────────────────────────────

describe('fromBinary', () => {
  describe('to ArrayBuffer (default)', () => {
    it('converts a single byte binary string to an ArrayBuffer', () => {
      const result = fromBinary('01000001') as ArrayBuffer;
      expect(buffersEqual(result, bufferOf(0x41))).toBe(true);
    });

    it('converts space-separated bytes to an ArrayBuffer', () => {
      const result = fromBinary('01000001 01000010') as ArrayBuffer;
      expect(buffersEqual(result, bufferOf(0x41, 0x42))).toBe(true);
    });

    it('respects custom separator', () => {
      const result = fromBinary('01000001-01000010', { separator: '-' }) as ArrayBuffer;
      expect(buffersEqual(result, bufferOf(0x41, 0x42))).toBe(true);
    });
  });

  describe('to string', () => {
    it('decodes a binary string to a UTF-8 string', () => {
      expect(fromBinary('01000001 01000010', { outputType: 'string' })).toBe('AB');
    });
  });

  describe('to boolean', () => {
    it('converts "1" to true', () => {
      expect(fromBinary('1', { outputType: 'boolean' })).toBe(true);
    });

    it('converts "0" to false', () => {
      expect(fromBinary('0', { outputType: 'boolean' })).toBe(false);
    });

    it('throws for values other than "0" or "1"', () => {
      expect(() => fromBinary('01000001', { outputType: 'boolean' })).toThrow();
    });
  });
});

// ─── Individual helpers ───────────────────────────────────────────────────────

describe('arrayBufferToBinary', () => {
  it('converts a buffer to a space-separated binary string', () => {
    expect(arrayBufferToBinary(bufferOf(0x41, 0x42))).toBe('01000001 01000010');
  });
});

describe('stringToBinary', () => {
  it('converts a string to space-separated binary bytes', () => {
    expect(stringToBinary('AB')).toBe('01000001 01000010');
  });
});

describe('booleanToBinary', () => {
  it('converts true to "1"', () => expect(booleanToBinary(true)).toBe('1'));
  it('converts false to "0"', () => expect(booleanToBinary(false)).toBe('0'));
});

describe('binaryToArrayBuffer', () => {
  it('decodes space-separated bytes to an ArrayBuffer', () => {
    const result = binaryToArrayBuffer('01000001 01000010');
    expect(buffersEqual(result, bufferOf(0x41, 0x42))).toBe(true);
  });

  it('throws for invalid binary input', () => {
    expect(() => binaryToArrayBuffer('notbinary')).toThrow();
  });
});

describe('binaryToString', () => {
  it('decodes space-separated bytes to a UTF-8 string', () => {
    expect(binaryToString('01000001 01000010')).toBe('AB');
  });
});

describe('binaryToBoolean', () => {
  it('parses "1" to true', () => expect(binaryToBoolean('1')).toBe(true));
  it('parses "0" to false', () => expect(binaryToBoolean('0')).toBe(false));
  it('throws for invalid input', () => expect(() => binaryToBoolean('01000001')).toThrow());
});

// ─── Round-trip ───────────────────────────────────────────────────────────────

describe('round-trip', () => {
  it('ArrayBuffer: toBinary -> fromBinary returns equivalent buffer', () => {
    const original = bufferOf(0x48, 0x65, 0x6c, 0x6c, 0x6f); // 'Hello'
    const binary = toBinary(original);
    const result = fromBinary(binary as string) as ArrayBuffer;
    expect(buffersEqual(result, original)).toBe(true);
  });

  it('string: toBinary -> fromBinary (string) returns original', () => {
    const original = 'Hello';
    const binary = toBinary(original);
    expect(fromBinary(binary as string, { outputType: 'string' })).toBe(original);
  });

  it('boolean true: toBinary -> fromBinary returns true', () => {
    expect(fromBinary(toBinary(true) as string, { outputType: 'boolean' })).toBe(true);
  });
});
