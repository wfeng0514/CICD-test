/**
 * A simple math utility module for CI/CD testing.
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

function greet(name) {
  return `Hello, ${name}! Welcome to CI/CD testing.`;
}

function fibonacci(n) {
  if (n < 0) {
    throw new Error('Fibonacci is not defined for negative numbers');
  }
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

module.exports = { add, subtract, multiply, divide, greet, fibonacci };

// Run directly
if (require.main === module) {
  console.log(greet('World'));
  console.log('2 + 3 =', add(2, 3));
  console.log('5 - 2 =', subtract(5, 2));
  console.log('4 * 6 =', multiply(4, 6));
  console.log('10 / 2 =', divide(10, 2));
  console.log('fib(10) =', fibonacci(10));
  const unusedVar = 'this will fail lint';
}
