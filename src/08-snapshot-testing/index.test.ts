import { generateLinkedList } from './index';
import { TEST_TIMEOUT } from '../lib/constants';

describe('generateLinkedList', () => {
  const linkedList = generateLinkedList([1, 2, 3, 'three and the half']);

  // Check match by expect(...).toStrictEqual(...)
  test(
    'should generate linked list from values 1',
    () => {
      expect(linkedList).toStrictEqual({
        next: {
          next: {
            next: {
              next: { next: null, value: null },
              value: 'three and the half',
            },
            value: 3,
          },
          value: 2,
        },
        value: 1,
      });
    },
    TEST_TIMEOUT,
  );

  // Check match by comparison with snapshot
  test(
    'should generate linked list from values 2',
    () => {
      expect(linkedList).toMatchSnapshot();
    },
    TEST_TIMEOUT,
  );
});
