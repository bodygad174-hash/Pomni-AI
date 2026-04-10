import { SubBots } from "meowsab";

async function sub(client) {
 
  global.subBots = new SubBots(client.commandSystem);
  const sub = global.subBots
  const { config } = client;

  await sub.setConfig({
    commandsPath: config.commandsPath || './commands',
    owners: config.owners,
    prefix: config.prefix,
    info: config.info,
    printQR: false
  });

  sub.on('error', (uid, error) => {
    console.error(`❌ [SubBot ${uid}] Error:`, error?.message || error);
  });

  const loadedCount = await global.subBots.load();
  console.log(`✅ Loaded ${loadedCount} saved bots`);

  sub.on('ready', async (uid, sock) => {
    console.log(`✅ [SubBot ${uid}] Connected!`);
  });

  sub.on('pair', (uid, code) => {
    console.log(`🔐 [SubBot ${uid}] Pairing code: ${code}`);
  });


  sub.on('message', async (uid, msg) => {
  });

  sub.on('close', (uid) => {
    console.log(`🔌 [SubBot ${uid}] Disconnected`);
  });

  sub.on('badSession', (uid) => {
    console.log(`⚠️ [SubBot ${uid}] Bad session, removed`);
  });

  return global.subBots;
}

export default sub;