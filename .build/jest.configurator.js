const path = require('path');

/**
 * 
 * @param {
 *   directory?: string;
 *   reporter?: Array<'lcov' | 'text-summary' | 'html' | 'json'>;
 *   coverageProvider?: 'v8' | 'babel';
 *   moduleNameMapper?: Record<string, string>;
 * } options 
 * @returns NYC Configuration
 * 
 */
module.exports = function(
  options
) {
  const projectDir = path.resolve(options.directory ?? path.join(__dirname, '..'));
  const coveragePath = path.join(projectDir, 'coverage');
  return {
    testRegex: "(/__tests__/.*|\\.spec)\\.(ts|js)$",
    transform: {
      "\\.(html|css|less|sass|scss|styl|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "./../../node_modules/jest-transform-stub",
      "^.+\\.tsx?$": [
        "./../../node_modules/ts-jest",
        {
          defaultShadowOptions: {
            mode: "open",
          },
        },
      ],
    },
    bail: true,
    testTimeout: 30000,
    maxConcurrency: 1,
    maxWorkers: 1,
    moduleNameMapper: options.moduleNameMapper ?? {
      "@aegenet/(.*)": path.join(projectDir, '..', '$1', 'src'),
    },
    testPathIgnorePatterns: [path.join(projectDir, '/build/'), path.join(projectDir, '/node_modules/')],
    coverageProvider: options.coverageProvider ?? "babel",
    coverageDirectory: coveragePath,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', "!src/**/*.d.ts"],
    coverageReporters: options.reporter ?? [
      "json", "text-summary"
    ],
    globals: {
      "ts-jest": {
        isolatedModules: true,
      },
    },
  };
};
