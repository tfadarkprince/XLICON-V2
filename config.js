import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'

// Global variables
global.owner = [
  ['918136880986', '𝐃𝐚𝐫𝐤 𝐏𝐫𝐢𝐧𝐜𝐞  ? ?', true], 
  ['919633485762', '𝐀𝐚𝐝𝐡𝐢 𝐬𝐞𝐫 -(𝟐𝐧𝐮𝐦)', true], 
  ['917736197362', '𝐀𝐜𝐡𝐮 𝐬𝐞𝐫', true],
  ['233268374753', 'Abraham Dwamena3.0', true]
] 

global.mods = ['917888755628','923184070915', '233268374753', '923184474176', '233268374753'] 
global.prems = ['923184070915', '94789481495', '918360234087', '233268374753']
global.allowed = ['923184070915', '233268374753', '918360234087', '233268374753']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = global.keysZens[Math.floor(global.keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = global.keysxteammm[Math.floor(global.keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = global.keysneoxrrr[Math.floor(global.keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']
global.beta = 'mLxstUwm'

global.APIs = {
  xteam: 'https://api.xteam.xyz', 
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api-fgmods.ddns.net'
}

global.APIKeys = { 
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': global.keysneoxr,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': global.keysxxx, 
  'https://api-fgmods.ddns.net': 'fg-dylux'
}

// Sticker WM
global.botname = '𝘟𝘭𝘪𝘤𝘰𝘯 𝘝𝘰𝘭 2'
global.premium = 'true'
global.packname = '𝙏𝙚𝙖𝙢 𝙓𝙇𝙄𝘾𝙊𝙉' 
global.author = '@𝘮𝘥𝘹𝘭𝘪𝘤𝘰𝘯𝘷2' 
global.menuvid = 'https://files.catbox.moe/yu3j54.mp4'
global.igfg = '▢✓ Follow Our channel\nhttps://whatsapp.com/channel/0029VaMGgVL3WHTNkhzHik3c\n' 
global.dygp = 'https://whatsapp.com/channel/0029VayY2vu1NCrLQHzmRB2Q'
global.fgsc = 'https://github.com/tfadarkprince/XLICON-V2' 
global.fgyt = 'https://youtube.com/@s4salmanyt'
global.fgpyp = 'https://youtube.com/@s4salmanyt'
global.fglog = 'XLICON.jpg' 
global.thumb = fs.readFileSync('./XLICON.jpg')

global.wait = '*🕣 _XLICON IS LOADING..._*\n*▰▰▰▱▱▱▱▱⭐*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✔️'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '3'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
