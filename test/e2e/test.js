var base = 'http://localhost:' + (process.env.PORT || 8002)

module.exports = {
  'components e2e tests': function (browser) {
    browser
      .url(base)
        .waitForElementVisible('h1', 1000)
        .assert.containsText('.view', 'FOUR OH FOUR')

      // /components
      .url(base + '/components')
  }
}
