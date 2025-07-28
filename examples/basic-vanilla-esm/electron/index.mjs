import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow } from 'electron';
import { createIPCHandler } from 'electron-trpc/main';
import { router } from './api.mjs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const html = path.join(dirname, '../dist/index.html');

app.on('ready', () => {
  const win = new BrowserWindow({
    webPreferences: {
      // Context isolation is required for electron-trpc
      contextIsolation: true,
      // No preload script needed - it will be auto-registered!
    },
  });

  // The autoRegisterPreload option defaults to true now
  createIPCHandler({ router, windows: [win] });

  win.loadFile(html);

  win.show();
});
