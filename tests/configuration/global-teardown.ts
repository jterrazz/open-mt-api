import { TestContext } from '@tests/e2e/context';

const globalTeardown = async () => {
    await TestContext.database().disconnect();
};

export default globalTeardown;
