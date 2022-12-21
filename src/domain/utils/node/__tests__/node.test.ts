import { getCallerFile } from '@domain/utils/node/node';

describe('utils/node.js', function () {
    describe('getCallerFile()', function () {
        it('should return the caller file name', function () {
            expect(getCallerFile()).toEqual('utils'); // jest is wrapping the calls
        });
    });
});
