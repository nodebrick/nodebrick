module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    cacheDirectory: __dirname + '/.jest_cache',
    collectCoverage: false,
    collectCoverageFrom: [
        "**/src/**"
    ],
    coveragePathIgnorePatterns: [
        "src/.*/(tests/.*.mock)\\.(jsx?|tsx?)$",
    ],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
        }
    },
    setupFilesAfterEnv: ["jest-extended"],
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
};