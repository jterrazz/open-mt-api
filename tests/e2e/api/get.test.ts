import { getProjectDependencies } from '~/configuration/project-dependencies';
import request from 'supertest';

const {
    webserver: { app },
} = getProjectDependencies();

beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
});

describe('end to end - GET /', function () {
    it('should return API status', function (done) {
        request(app.callback()).get('/').expect('Content-Type', /json/).expect(
            200,
            {
                env: 'test',
                state: 'OK',
                time: '2020-01-01T00:00:00.000Z',
                version: '1.0.0',
            },
            done,
        );
    });
});
