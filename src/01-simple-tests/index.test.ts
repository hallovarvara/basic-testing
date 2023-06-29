import { simpleCalculator, Action } from './index';
import { TEST_TIMEOUT } from '../lib/constants';

describe('simpleCalculator tests', () => {
  test(
    'should add two numbers',
    () => {
      expect(simpleCalculator({ a: 5, b: 19, action: Action.Add })).toBe(24);
    },
    TEST_TIMEOUT,
  );

  test(
    'should subtract two numbers',
    () => {
      expect(simpleCalculator({ a: 5, b: 19, action: Action.Subtract })).toBe(
        -14,
      );
    },
    TEST_TIMEOUT,
  );

  test(
    'should multiply two numbers',
    () => {
      expect(simpleCalculator({ a: 5, b: 19, action: Action.Multiply })).toBe(
        95,
      );
    },
    TEST_TIMEOUT,
  );

  test(
    'should divide two numbers',
    () => {
      expect(simpleCalculator({ a: 20, b: 5, action: Action.Divide })).toBe(4);
    },
    TEST_TIMEOUT,
  );

  test(
    'should exponentiate two numbers',
    () => {
      expect(
        simpleCalculator({ a: 2, b: 6, action: Action.Exponentiate }),
      ).toBe(64);
    },
    TEST_TIMEOUT,
  );

  test(
    'should return null for invalid action',
    () => {
      expect(
        simpleCalculator({
          a: 2,
          b: 6,
          action: 'Give me one billion bucks, please',
        }),
      ).toBeNull();
    },
    TEST_TIMEOUT,
  );

  test(
    'should return null for invalid arguments',
    () => {
      expect(
        simpleCalculator({
          a: 'two',
          b: 6,
          action: Action.Add,
        }),
      ).toBeNull();
    },
    TEST_TIMEOUT,
  );
});
