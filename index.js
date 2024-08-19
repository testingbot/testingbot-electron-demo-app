const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 360,
        height: 460,
        icon:'icon.png',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.setMenuBarVisibility(false);
    win.setResizable(false);

    win.loadFile('src/html/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
