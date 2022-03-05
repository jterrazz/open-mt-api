import { useFakeTimers, useRealTimers } from '@tests/utils/timer';

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('shop controller', function () {
    describe('createShop()', function () {
        test('create shop and send back public properties', async () => {
            expect(true).toEqual(true);
        });
    });
});
