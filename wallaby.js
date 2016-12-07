module.exports = function () {
  return {
    files: [
      'app/**/*.ts',
      'app/**/*.tsx',
      '!app/**/*.spec.ts',
      '!app/**/*.spec.tsx',
    ],

    tests: [
      'app/**/*.spec.ts',
      'app/**/*.spec.tsx',
    ],

    env: {
      type: 'node'
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: 'jasmine'
  };
};
