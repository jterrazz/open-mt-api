const _getStack = (): NodeJS.CallSite[] | null => {
    const originalPrepareStackTrace = Error.prepareStackTrace;

    Error.prepareStackTrace = function (_, stack) {
        return stack;
    };

    const err = new Error();
    const stack = err.stack as unknown as NodeJS.CallSite[] | null;

    Error.prepareStackTrace = originalPrepareStackTrace;

    return stack;
};

export const getCallerFile = (): string | undefined => {
    const stack = _getStack();

    stack?.shift();
    stack?.shift();

    const currentFile = stack?.shift()?.getFileName();

    while (stack?.length) {
        const callerFile = stack?.shift()?.getFileName();

        if (currentFile !== callerFile) {
            return callerFile
                ?.split('/')
                .pop()
                ?.replace('.ts', '')
                .replace('.js', '');
        }
    }
};
