import { getProjectDependencies } from '~/configuration/project-dependencies';
import request from 'supertest';

const {
    webserver: { app },
} = getProjectDependencies();

beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01').getTime());
});

afterAll(function () {
    jest.useRealTimers();
});

describe('END TO END - GET /', function () {
    test.concurrent('returns the API status', (done) => {
        // When
        const ft = request(app.callback()).get('/');

        // Then
        ft.expect('Content-Type', /json/).expect(
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
