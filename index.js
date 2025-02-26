require('./settings');
const fs = require('fs');
const pino = require('pino');
const { color } = require('./lib/color');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const { File } = require('megajs');
const FileType = require('file-type');
const { exec } = require('child_process');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const PhoneNumber = require('awesome-phonenumber');
const { default: makeWASocket, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, proto, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');

let phoneNumber = "923184070915";
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
let owner = JSON.parse(fs.readFileSync('./src/owner.json'));

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');

const DataBase = require('./src/database');
const database = new DataBase();
(async () => {
	const loadData = await database.read();
	if (loadData && Object.keys(loadData).length === 0) {
		global.db = {
			sticker: {},
			users: {},
			groups: {},
			database: {},
			settings: {},
			others: {},
			...(loadData || {}),
		};
		await database.write(global.db);
	} else {
		global.db = loadData;
	}
	
	setInterval(async () => {
		if (global.db) await database.write(global.db);
	}, 30000);
})();

const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function');


const sessionDir = path.join(__dirname, 'session');
const credsPath = path.join(sessionDir, 'creds.json');

async function sessionLoader() {
  try {
    // Ensure session directory exists
    await fs.promises.mkdir(sessionDir, { recursive: true });

    if (!fs.existsSync(credsPath)) {
      if (!global.SESSION_ID) {
      return console.log(color(`Session id and creds.json not found!!\n\nWait to enter your number`, 'red'));
      }

      const sessionData = global.SESSION_ID.split("XLICON-V4~")[1];
      const filer = File.fromURL(`https://mega.nz/file/${sessionData}`);

      await new Promise((resolve, reject) => {
        filer.download((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      })
      .then(async (data) => {
        await fs.promises.writeFile(credsPath, data);
        console.log(color(`Session downloaded successfully, proceeding to start...`, 'green'));
        await startXliconBot();
      });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
  }
}

console.log(
  chalk.cyan(`
██╗  ██╗██╗      ██████╗██╗ ██████╗ ███╗   ██╗      ██╗   ██╗██╗  ██╗
╚██╗██╔╝██║     ██╔════╝██║██╔═══██╗████╗  ██║      ██║   ██║██║  ██║
 ╚███╔╝ ██║     ██║     ██║██║   ██║██╔██╗ ██║█████╗██║   ██║███████║
 ██╔██╗ ██║     ██║     ██║██║   ██║██║╚██╗██║╚════╝╚██╗ ██╔╝╚════██║
██╔╝ ██╗███████╗╚██████╗██║╚██████╔╝██║ ╚████║       ╚████╔╝      ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝        ╚═══╝       ╚═╝
  `)
);

console.log(chalk.white.bold(`${chalk.gray.bold("📃  Information :")}         
✉️  Script : XLICON-V4-MD
✉️  Author : SALMAN AHMAD
✉️  Gmail : salmansheikh2500@gmail.com
✉️  Instagram : ahmmikun

${chalk.green.bold("Ｐｏｗｅｒｅｄ Ｂｙ ＸＬＩＣＯＮ ＢＯＴＺ")}\n`));

async function startXliconBot() {
    //------------------------------------------------------
    let version = [2, 3000, 1015901307];
    let isLatest = false;
    
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    const msgRetryCounterCache = new NodeCache();
    
    const XliconBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
        browser: Browsers.windows('Firefox'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        version, // Using specified version
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
            let jid = jidNormalizedUser(key.remoteJid);
            let msg = await store.loadMessage(jid, key.id);
            return msg?.message || "";
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });
   
    store.bind(XliconBotInc.ev);

    if (pairingCode && !XliconBotInc.authState.creds.registered) {
        if (useMobile) throw new Error('Cannot use pairing code with mobile API');

        let phoneNumber;
        phoneNumber = await question('Please enter your number starting with country code like 92:\n');
        phoneNumber = phoneNumber.trim();

        setTimeout(async () => {
            const code = await XliconBotInc.requestPairingCode(phoneNumber);
            console.log(chalk.black(chalk.bgGreen(`🎁  Pairing Code : ${code}`)));
        }, 3000);
    }

    store.bind(XliconBotInc.ev);
    await Solving(XliconBotInc, store);
    XliconBotInc.ev.on('creds.update', saveCreds);
    XliconBotInc.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, receivedPendingNotifications } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.connectionLost) {
                console.log('Connection to Server Lost, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log('Connection closed, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required...');
                startXliconBot();
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection Timed Out, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.badSession) {
                console.log('Delete Session and Scan again...');
                process.exit(1);
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Close current Session first...');
                XliconBotInc.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log('Scan again and Run...');
            } else if (reason === DisconnectReason.Multidevicemismatch) {
                console.log('Scan again...');
            } else {
                XliconBotInc.end(`Unknown DisconnectReason : ${reason}|${connection}`);
            }
        }
        if (connection == 'open') {
            console.log('Connected to : ' + JSON.stringify(XliconBotInc.user, null, 2));
        } else if (receivedPendingNotifications == 'true') {
            console.log('Please wait About 1 Minute...');
        }
    });
    
    XliconBotInc.ev.on('contacts.update', (update) => {
        for (let contact of update) {
            let id = XliconBotInc.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });
    
    XliconBotInc.ev.on('call', async (call) => {
        let botNumber = await XliconBotInc.decodeJid(XliconBotInc.user.id);
        let anticall = global.db.settings[botNumber].anticall;
        if (anticall) {
            for (let id of call) {
                if (id.status === 'offer') {
                    let msg = await XliconBotInc.sendMessage(id.from, { text: `Currently, We Cannot Receive Calls ${id.isVideo ? 'Video' : 'Voice'}.\nIf @${id.from.split('@')[0]} Needs Help, Please Contact Owner :)`, mentions: [id.from] });
                    await XliconBotInc.sendContact(id.from, global.owner, msg);
                    await XliconBotInc.rejectCall(id.id, id.from);
                }
            }
        }
    });
    
    XliconBotInc.ev.on('groups.update', async (update) => {
        await GroupUpdate(XliconBotInc, update, store);
    });
    
    XliconBotInc.ev.on('group-participants.update', async (update) => {
        await GroupParticipantsUpdate(XliconBotInc, update);
    });
    
    XliconBotInc.ev.on('messages.upsert', async (message) => {
        await MessagesUpsert(XliconBotInc, message, store);
    });
    return XliconBotInc;
}

async function initStart() {
    if (fs.existsSync(credsPath)) {
        console.log(color("Creds.json exists, proceeding to start...", 'yellow'));
await startXliconBot();
} else {
         const sessionCheck = await sessionLoader();
        if (sessionCheck) {
            console.log("Session downloaded successfully, proceeding to start... .");
await startXliconBot();
    } else {
     if (!fs.existsSync(credsPath)) {
    if(!global.SESSION_ID) {
            console.log(color("Please wait for a few seconds to enter your number!", 'red'));
await startXliconBot();
        }
    }
  }
 }
} 
initStart();
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
