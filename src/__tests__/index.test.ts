import {
  toBinary,
  fromBinary,
  numberToBinary,
  stringToBinary,
  booleanToBinary,
  bigintToBinary,
  binaryToNumber,
  binaryToString,
  binaryToBoolean,
  binaryToBigInt,
} from '../index';

// ─── toBinary ────────────────────────────────────────────────────────────────

describe('toBinary', () => {
  describe('number', () => {
    it('converts a positive integer to 8-bit binary', () => {
      expect(toBinary(65)).toBe('01000001');
    });

    it('converts zero to 8-bit binary', () => {
      expect(toBinary(0)).toBe('00000000');
    });

    it('converts a negative integer', () => {
      expect(toBinary(-1)).toBe('-00000001');
    });

    it('respects custom bits option', () => {
      expect(toBinary(5, { bits: 4 })).toBe('0101');
    });

    it('throws for non-integer numbers', () => {
      expect(() => toBinary(3.14)).toThrow(TypeError);
    });
  });

  describe('string', () => {
    it('converts a single character', () => {
      expect(toBinary('A')).toBe('01000001');
    });

    it('converts a multi-character string with default separator', () => {
      expect(toBinary('AB')).toBe('01000001 01000010');
    });

    it('respects custom separator', () => {
      expect(toBinary('AB', { separator: '-' })).toBe('01000001-01000010');
    });

    it('converts an empty string to an empty string', () => {
      expect(toBinary('')).toBe('');
    });
  });

  describe('boolean', () => {
    it('converts true to 1', () => {
      expect(toBinary(true)).toBe('1');
    });

    it('converts false to 0', () => {
      expect(toBinary(false)).toBe('0');
    });
  });

  describe('bigint', () => {
    it('converts a positive bigint', () => {
      expect(toBinary(255n)).toBe('11111111');
    });

    it('converts zero bigint', () => {
      expect(toBinary(0n)).toBe('0');
    });

    it('converts a negative bigint', () => {
      expect(toBinary(-1n)).toBe('-1');
    });
  });
});

// ─── fromBinary ──────────────────────────────────────────────────────────────

describe('fromBinary', () => {
  describe('to string (default)', () => {
    it('converts 8-bit binary to a character', () => {
      expect(fromBinary('01000001')).toBe('A');
    });

    it('converts space-separated bytes to a string', () => {
      expect(fromBinary('01000001 01000010')).toBe('AB');
    });

    it('respects custom separator', () => {
      expect(fromBinary('01000001-01000010', { separator: '-' })).toBe('AB');
    });
  });

  describe('to number', () => {
    it('converts a binary string to a number', () => {
      expect(fromBinary('01000001', { outputType: 'number' })).toBe(65);
    });

    it('converts a negative binary string to a negative number', () => {
      expect(fromBinary('-00000001', { outputType: 'number' })).toBe(-1);
    });
  });

  describe('to boolean', () => {
    it('converts 1 to true', () => {
      expect(fromBinary('1', { outputType: 'boolean' })).toBe(true);
    });

    it('converts 0 to false', () => {
      expect(fromBinary('0', { outputType: 'boolean' })).toBe(false);
    });

    it('throws for invalid boolean binary', () => {
      expect(() => fromBinary('01000001', { outputType: 'boolean' })).toThrow(TypeError);
    });
  });
});

// ─── Individual helpers ───────────────────────────────────────────────────────

describe('binaryToNumber', () => {
  it('parses a binary string to a number', () => {
    expect(binaryToNumber('01000001')).toBe(65);
  });

  it('handles negative binary strings', () => {
    expect(binaryToNumber('-00000001')).toBe(-1);
  });

  it('throws for invalid input', () => {
    expect(() => binaryToNumber('abc')).toThrow(TypeError);
  });
});

describe('binaryToString', () => {
  it('decodes space-separated bytes', () => {
    expect(binaryToString('01000001 01000010')).toBe('AB');
  });
});

describe('binaryToBigInt', () => {
  it('parses a binary string to a BigInt', () => {
    expect(binaryToBigInt('11111111')).toBe(255n);
  });

  it('handles negative binary strings', () => {
    expect(binaryToBigInt('-1')).toBe(-1n);
  });
});

describe('roundtrip', () => {
  it('number: toBinary -> fromBinary returns original', () => {
    const original = 123;
    const binary = toBinary(original);
    expect(fromBinary(binary as string, { outputType: 'number' })).toBe(original);
  });

  it('string: toBinary -> fromBinary returns original', () => {
    const original = 'Hello';
    const binary = toBinary(original);
    expect(fromBinary(binary as string)).toBe(original);
  });
});
