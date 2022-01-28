export const createMockOfShopRepository = () => ({
    findByHandle: jest.fn().mockImplementation(async (input) => input),
    merge: jest.fn().mockImplementation(async (input) => input),
    persist: jest.fn().mockImplementation(async (input) => input),
});
