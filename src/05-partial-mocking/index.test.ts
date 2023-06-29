import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';
import { TEST_TIMEOUT } from '../lib/constants';

jest.mock('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test(
    'mockOne, mockTwo, mockThree should not log into console',
    () => {
      const spy = jest.spyOn(console, 'log');

      mockOne();
      mockTwo();
      mockThree();

      expect(spy).not.toBeCalled();
    },
    TEST_TIMEOUT,
  );

  test(
    'unmockedFunction should log into console',
    () => {
      const spy = jest.spyOn(console, 'log');

      unmockedFunction();

      expect(spy).toBeCalled();
    },
    TEST_TIMEOUT,
  );
});
