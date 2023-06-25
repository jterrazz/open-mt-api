import { mock } from 'jest-mock-extended';

import { ExposedError } from '@domain/errors/exposed.error';

import { Logger } from '@ports/logger';

import { getTypeSafeInputsFromKoaFactory } from '@adapters/routes/get-type-safe-inputs-from.koa';
import { KoaContext } from '@adapters/routes/koa-deserializer.adapter';
import { getUserKoaDeserializer } from '@adapters/routes/user/get-user.koa-deserializer';

describe('getUserKoaDeserializer()', () => {
    test('should return the user id', () => {
        // Given
        const mockOfCtx = mock<KoaContext>({
            params: {
                id: '1',
            },
        });
        const getTypeSafeInputsFromKoa = getTypeSafeInputsFromKoaFactory(mock<Logger>(), mockOfCtx);

        // When
        const userId = getUserKoaDeserializer(getTypeSafeInputsFromKoa);

        // Then
        expect(userId).toBe(1);
    });

    test('should throw an error if the user id is not a number', () => {
        // Given
        const mockOfCtx = mock<KoaContext>({
            params: {
                id: 'a',
            },
        });
        const getTypeSafeInputsFromKoa = getTypeSafeInputsFromKoaFactory(mock<Logger>(), mockOfCtx);

        // When
        const getUserKoaDeserializerWithInvalidUserId = () =>
            getUserKoaDeserializer(getTypeSafeInputsFromKoa);

        // Then
        expect(getUserKoaDeserializerWithInvalidUserId).toThrow(ExposedError);
    });

    test('should throw an error if the user id is missing', () => {
        // Given
        const mockOfCtx = mock<KoaContext>({
            params: {},
        });
        const getTypeSafeInputsFromKoa = getTypeSafeInputsFromKoaFactory(mock<Logger>(), mockOfCtx);

        // When
        const getUserKoaDeserializerWithInvalidUserId = () =>
            getUserKoaDeserializer(getTypeSafeInputsFromKoa);

        // Then
        expect(getUserKoaDeserializerWithInvalidUserId).toThrow(ExposedError);
    });
});
