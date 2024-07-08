// /** @type {import('ts-jest').JestConfigWithTsJest} */
// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

// jest.config.ts

// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jest-environment-jsdom',
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//     // process `*.tsx` files with `ts-jest`
//   },
//   rootDir: 'src',
//   moduleNameMapper: {
//     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
//     '^@app/(.*)$': '<rootDir>/$1',
//     "^@/(.*)$": "<rootDir>/$1",
//   },
// };

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // transformIgnorePatterns: [`/node_modules/(?!})`],

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

// module.exports = {
//   transformIgnorePatterns: [
//     '/node_modules/',
//     '/dist/'
//     // Add more patterns as needed
//   ],
// };