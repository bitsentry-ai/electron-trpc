// This example demonstrates manual preload script configuration
// The automatic preload registration is disabled in electron/index.ts
import { exposeElectronTRPC } from 'electron-trpc/preload';

process.once('loaded', async () => {
  exposeElectronTRPC();
});
