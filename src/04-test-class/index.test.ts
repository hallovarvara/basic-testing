import lodash from 'lodash';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { TEST_TIMEOUT } from '../lib/constants';

const INITIAL_BALANCE = 500;

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    jest.resetModules();
    bankAccount = getBankAccount(INITIAL_BALANCE);
  });

  test(
    'should create account with initial balance',
    () => {
      expect(bankAccount).toBeInstanceOf(BankAccount);
      expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE);
    },
    TEST_TIMEOUT,
  );

  test(
    'should throw InsufficientFundsError error when withdrawing more than balance',
    () => {
      expect(() => bankAccount.withdraw(INITIAL_BALANCE * 2)).toThrowError(
        InsufficientFundsError,
      );
    },
    TEST_TIMEOUT,
  );

  test(
    'should throw error when transferring more than balance',
    () => {
      const friendsBankAccount = new BankAccount(0);

      expect(() =>
        bankAccount.transfer(INITIAL_BALANCE * 2, friendsBankAccount),
      ).toThrowError(InsufficientFundsError);
    },
    TEST_TIMEOUT,
  );

  test(
    'should throw error when transferring to the same account',
    () => {
      expect(() =>
        bankAccount.transfer(INITIAL_BALANCE / 2, bankAccount),
      ).toThrowError(TransferFailedError);
    },
    TEST_TIMEOUT,
  );

  test(
    'should deposit money',
    () => {
      const deposit = INITIAL_BALANCE / 2;
      bankAccount.deposit(deposit);
      expect(bankAccount.getBalance()).toBe(INITIAL_BALANCE + deposit);
    },
    TEST_TIMEOUT,
  );

  test(
    'should withdraw money',
    () => {
      bankAccount.withdraw(INITIAL_BALANCE);
      expect(bankAccount.getBalance()).toBe(0);
    },
    TEST_TIMEOUT,
  );

  test(
    'should transfer money',
    () => {
      const friendsBankAccount = new BankAccount(0);
      bankAccount.transfer(INITIAL_BALANCE, friendsBankAccount);
      expect(friendsBankAccount.getBalance()).toBe(INITIAL_BALANCE);
    },
    TEST_TIMEOUT,
  );

  test(
    'fetchBalance should return number in case if request did not failed',
    async () => {
      const mockBalance = 98;

      jest.spyOn(lodash, 'random').mockImplementation(() => mockBalance);

      expect(await bankAccount.fetchBalance()).toBe(mockBalance);
    },
    TEST_TIMEOUT,
  );

  test(
    'should set new balance if fetchBalance returned number',
    async () => {
      const mockBalance = 11;

      jest.spyOn(lodash, 'random').mockImplementation(() => mockBalance);

      await bankAccount.synchronizeBalance();

      expect(bankAccount.getBalance()).toBe(mockBalance);
    },
    TEST_TIMEOUT,
  );

  test(
    'should throw SynchronizationFailedError if fetchBalance returned null',
    async () => {
      jest.spyOn(lodash, 'random').mockImplementation(() => 0);

      await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
        SynchronizationFailedError,
      );
    },
    TEST_TIMEOUT,
  );
});
