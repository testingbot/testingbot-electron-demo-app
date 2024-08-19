const webdriver = require('selenium-webdriver');
const assert = require('assert');

(async function listElements() {
    const driver = new webdriver.Builder()
        // The "9515" is the port opened by ChromeDriver.
        .usingServer('http://localhost:9515')
        .withCapabilities({
            'goog:chromeOptions': {
                binary: '/Applications/testingbot-electron-demo-app.app/Contents/MacOS/testingbot-electron-demo-app'
            }
        })
        .forBrowser('chrome')
        .build();

    try {
      // Generate two random numbers between 0 and 10
      const num1 = Math.floor(Math.random() * 9);
      const num2 = Math.floor(Math.random() * 9);

        // Find elements on the page
        const firstNumber = await driver.findElement(webdriver.By.id(`btn-${num1}`));
        const secondNumber = await driver.findElement(webdriver.By.id(`btn-${num2}`));
        const plus = await driver.findElement(webdriver.By.id('btn-plus'));
        const equal = await driver.findElement(webdriver.By.id('btn-equal'));

        // Perform operations
        await firstNumber.click();
        await plus.click();
        await secondNumber.click();
        await equal.click();

        // Get the result
        const resultElement = await driver.findElement(webdriver.By.id('calc-display'));
        const resultText = await resultElement.getText();
        assert.strictEqual(parseInt(resultText, 10), num1 + num2);

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        await driver.quit();
    }
})();
