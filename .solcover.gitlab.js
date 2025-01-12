module.exports = {
  skipFiles: [
    'pentesting/',
    'eips/ExampleErc20.sol',
    'eips/ExampleErc721.sol',
    'eips/ExampleErc1155.sol',
    'authenticators/AuthDashboardV1.sol', // obsolete version contract
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
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: './junit.xml'
    }
  }
};