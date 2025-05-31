const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOExFWDFUbnZjT08xNHc3QUhYdDlaOGMwSzk0NkFCdGdxV0hRcUdrTnNtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidHdZSHZpYjhHTE5JVjN4RU82Z3JiR2RjMmdjRitNQ1cwZ1hNeTB0OVBVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQzFoZkkvejNMQWlVa1NNSFRPZy9WVmNZWWUreHF4MHFoVkliSlE1dGtJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBVjNBU2pQMUZUZVBvNFR2alpOT2ZyZWh0T0JvcXYvNERZdUlET2tPUGlFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVFYlg1aGlOY1BYZ2cyOVRTUmNFNWNTSm1Dc2pGRDVwOGsxeVJlSk5uR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InI4Q1R6MmV6STlnZkIyVmRJMjJ1dGlSTWxDcWIwYWlXQnBZR0VtZlcweUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBBTDVvaFZLWkRrUzBDUDFqbFAyTWI0Mll5Sy9DYWZUaVhBQUZMc2JXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUt2YmhPWk05QnlFSUhIY1N3YTN4ZWNFcjBwNmQ5WDRDejV2SHYzU3Z3MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZsQWFJbFREMXVzcklXcmpFTktzME1zWXNxMUJvM2ZKN1VLL1lpVjU0b2dQOVdnNHcyM2NQejBFSVJXVDREWWpqSzVJeE1JZHlobUQ1bElzOS9qbWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NiwiYWR2U2VjcmV0S2V5IjoiYUN6MVNVZE91QyttV2tNS0R5bkJFYXlBYjBnRW1FM2duK3ZnbUhTRUlUWT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ5MDM2MzczMTA0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQyODZGM0EwNjcxQzg1RTNCNDA1ODZCMjQzNjM5QUY4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg2OTMxNjV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZtc2RzWElmUmJ5Rl9YOWk2dktwWGciLCJwaG9uZUlkIjoiOGJkNDI4NTktZDllNS00YjYxLWI0ODEtZjQzNjNiMmMxNTI0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZhY0xoNjl5aHlGemxjeGY1UFd3Q3VrbTVCdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Snl6SitVU3ZMcmtyV2xhTzdrRDVlclBTcjg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjIzNDkwMzYzNzMxMDQ6MTdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNjQzMTc0OTY0MDYwOTY6MTdAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQYVI1WjBDRUp2aDY4RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzVklqU1kyQlhvSVZvVFNsdW56S29QOHFrNHlUek53c0VUV2hnTG9zZG5VPSIsImFjY291bnRTaWduYXR1cmUiOiJUbHVaVm5DV3AvRUdXak1HenMvRTAyajdkVCtOQ2xTdWtnU2xMNFpseFBNZlVOQWJqTHpPelYrbklHbDRWZ3RpSysrRmdjWHJnODU3aVU3V2xDeFVBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWUYxVUM2eHo3U2ZJdkVJcUJacmRoSzZCSlFPVXRDMWFiZjNLbjJ6V0ppd0g0dzZST091U2tzVmZ5enhHOU9CRzdTTFZnZkZTTEkwMUd1YysyeHVhaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDM2MzczMTA0OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQxU0kwbU5nVjZDRmFFMHBicDh5cUQvS3BPTWs4emNMQkUxb1lDNkxIWjEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0ODY5MzE2MSwibGFzdFByb3BIYXNoIjoibm0zQmIifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Jo-byte-hub/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Joshua",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349036373104",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "",  
    URL2: process.env.URL2 || "",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️Joshua☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '*Calls Are Highly Prohibited*',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "> *☢️JOSHTECH☢️*",
    BOT : process.env.BOT_NAME || '☢️ JOSH TECH ☢️⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nigeria", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
