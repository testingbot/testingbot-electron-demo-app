# testingbot-electron-demo-app

This repository contains a simple calculator app, built by TestingBot to demonstrate automated testing against Electron-based apps.

![Electron Calculator App](screenshot.jpg?raw=true "Electron Demo App")

## NodeJS Example

Below is an example on how to run this demo Electron app on TestingBot's remote machines:

```nodejs
const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

(async function example() {
    let driver;

    try {
        // Set capabilities
        let caps = {
            browserName: 'electron',
            platformName: 'VENTURA',
            browserVersion: '31',
            'tb:binary_location': 'testingbot-electron-demo-app.app/Contents/MacOS/testingbot-electron-demo-app',
            'tb:app': 'https://github.com/testingbot/testingbot-electron-demo-app/releases/download/v1.0.0/testingbot-electron-demo-app-darwin-arm64-1.0.0.zip'
        };

        driver = await new Builder()
            .usingServer('https://key:secret@hub.testingbot.com/wd/hub')
            .withCapabilities(caps)
            .build();

        // Generate two random numbers between 0 and 9
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);

        const firstNumber = await driver.findElement(By.id(`btn-${num1}`));
        const secondNumber = await driver.findElement(By.id(`btn-${num2}`));
        const plus = await driver.findElement(By.id('btn-plus'));
        const equal = await driver.findElement(By.id('btn-equal'));

        // Perform operations
        await firstNumber.click();
        await plus.click();
        await secondNumber.click();
        await equal.click();

        // Get the result
        const resultElement = await driver.findElement(By.id('calc-display'));
        const resultText = await resultElement.getText();

        // Verify the result
        if ((num1 + num2) !== parseInt(resultText)) {
            throw new Error('Test failed');
        }

    } catch (error) {
        console.error('Error during test execution:', error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
})();
```

## More information

More information is available on [TestingBot's Electron Documentation](https://testingbot.com/support/electron).