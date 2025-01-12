module.exports = {
  skipFiles: [
    'eips/ExampleErc20.sol',
    'eips/ExampleErc721.sol',
    'eips/ExampleErc1155.sol',
  ], // Add files to skip coverage here {'path/name.sol'}
  istanbulFolder: './.coverage', // Folder to store coverage reports
  istanbulReporter: ['html', 'lcov', 'text', 'json'], // Reporters to use
  measureStatementCoverage: true, // Measure statement coverage
  measureModifierCoverage: true, // Measure modifier coverage
  modifierWhitelist: [
    'onlyOwner', 'onlyAgent',
  ], // Add modifiers to whitelist here {'modifierName'}
  providerOptions: {
    default_balance_ether:
      100000
  },
  mocha: {
    timeout: 60000,
    // reporter: 'mocha-junit-reporter', // if enable can't see the output in the console
    reporterOptions: {
      mochaFile: './junit.xml'
    }
  }
};