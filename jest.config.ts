export default {
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.ts",
      "!**/lib/**",
      "!**/interfaces/**",
      "!**/jest.config.ts/**",
      "!**/node_modules/**",
      "!**/vendor/**",
      "!**/dist/**",
      "!**/models/**",
      "!index.ts",
      "!src/app.ts",
      "!**/constants.ts"
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["json", "text", "lcov", "clover", "cobertura"],
    reporters: ["default"],
    testEnvironment: "node",
    testMatch: ["**/src/**/*.app.spec.ts", "**/?(*.)+(spec|test).[t]s?(x)"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
  };
  