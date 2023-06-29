import { simpleCalculator, Action } from './index';
import { TEST_TIMEOUT } from '../lib/constants';

const TEST_CASES = [
  { a: 1, b: 2, action: Action.Add, expected: 3, message: 'add two numbers' },
  {
    a: 2,
    b: 25,
    action: Action.Subtract,
    expected: -23,
    message: 'subtract two numbers',
  },
  {
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
    message: 'multiply two numbers',
  },
  {
    a: 24,
    b: 4,
    action: Action.Divide,
    expected: 6,
    message: 'divide two numbers',
  },
  {
    a: 5,
    b: 3,
    action: Action.Exponentiate,
    expected: 125,
    message: 'exponentiate two numbers',
  },
  {
    a: 2,
    b: 6,
    action: 'Give me one billion bucks, please',
    expected: null,
    message: 'return null for invalid action',
  },
  {
    a: 'two',
    b: 6,
    action: Action.Add,
    expected: null,
    message: 'return null for invalid arguments',
  },
];

describe('simpleCalculator', () => {
  test.each(TEST_CASES)(
    'should $message',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
    TEST_TIMEOUT,
  );
});
