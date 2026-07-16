const { add, subtract, multiply, divide, greet, fibonacci } = require('./index');

describe('Math Utilities', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative and positive numbers', () => {
      expect(add(-2, 3)).toBe(1);
    });

    test('adds two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test('result can be negative', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(multiply(4, 6)).toBe(24);
    });

    test('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });
  });

  describe('greet', () => {
    test('returns a greeting message', () => {
      expect(greet('Alice')).toBe('Hello, Alice! Welcome to CI/CD testing.');
    });
  });

  describe('fibonacci', () => {
    test('fib(0) = 0', () => {
      expect(fibonacci(0)).toBe(0);
    });

    test('fib(1) = 1', () => {
      expect(fibonacci(1)).toBe(1);
    });

    test('fib(6) = 8', () => {
      expect(fibonacci(6)).toBe(8);
    });

    test('fib(10) = 55', () => {
      expect(fibonacci(10)).toBe(55);
    });

    test('throws on negative input', () => {
      expect(() => fibonacci(-1)).toThrow('Fibonacci is not defined for negative numbers');
    });
  });
});
