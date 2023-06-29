import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
import { TEST_TIMEOUT } from '../lib/constants';

describe('resolveValue', () => {
  test(
    'should resolve provided value',
    async () => {
      const value = 'hello ppl';
      expect(await resolveValue(value)).toBe(value);
    },
    TEST_TIMEOUT,
  );
});

describe('throwError', () => {
  test(
    'should throw error with provided message',
    () => {
      const errorMessage = 'message example';

      expect(() => {
        throwError(errorMessage);
      }).toThrowError(Error(errorMessage));
    },
    TEST_TIMEOUT,
  );

  test(
    'should throw error with default message if message is not provided',
    () => {
      expect(throwError).toThrowError(Error('Oops!'));
    },
    TEST_TIMEOUT,
  );
});

describe('throwCustomError', () => {
  test(
    'should throw custom error',
    () => {
      expect(throwCustomError).toThrowError(MyAwesomeError);
    },
    TEST_TIMEOUT,
  );
});

describe('rejectCustomError', () => {
  test(
    'should reject custom error',
    async () => {
      await expect(rejectCustomError).rejects.toThrowError(MyAwesomeError);
    },
    TEST_TIMEOUT,
  );
});
