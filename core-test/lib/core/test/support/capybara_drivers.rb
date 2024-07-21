Capybara.register_driver :rmb_selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')
  options.add_argument('--enable-logging')
  options.add_argument('--v=1')

  options.add_option('goog:loggingPrefs', {
    browser: 'ALL',
    performance: 'ALL'
  })

  Capybara::Selenium::Driver.new(app, browser: :chrome, options:)
end

Capybara.register_driver :rmb_selenium_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--enable-logging')
  options.add_argument('--v=1')

  options.add_option('goog:loggingPrefs', {
    browser: 'ALL',
    performance: 'ALL'
  })

  Capybara::Selenium::Driver.new(app, browser: :chrome, options:)
end