const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ05sZ1phdkd6Mi9Ud0N3aFdvZ3pRRHZOaUpHdWpHdnNnQ3F3ZVEyRkpubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTd6cEE4Y3RWVDh1RHcxQkVHSXdYRENzdVdaMlJIWlo3aCtseVNjLy9FZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTUlrM1BheDhWYVJlZXNGRjliM1VVWksxRWh1ekswRnljVndoMnBHU1dzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyc3gzL2dGSmUzTVdCdENkWUJXWjF1MVFwVEJUMVFDaGlFM3RBSU1hYUVVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVMdk45US80STFidUxZRG9CVUJ5SWUxZlhsY0hRSFc2Ni9GSS8yK0l2M2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9qa25NKzNWZERTY2s2SDRSQ1QxSjdBNHp5WElEc0NzalFBNGM4MkxseVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUU3NlU4Q0NhNjhEb3h2eXBhRndnNW5OeWhtcGZ2QkdUZHEzZzc2V0NIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0M5d20rZVA2Y3d1SndDYzVqUDhlQVhsNkx3MG0zb2FWNm1DeHk3STVoYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRoYXloS24zemRON2gvV2F0RUJuVnlWVFJkS1gzbHlTZlptRTNkNktGeVQyRlk1M0JSeVFLeFB0QkMyUUgyejFUNmpwamhRMkhnSlZQbG4zZElqK2lnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6InpsMDhST3F3L1JrWWQrVDJuK3VyZk9SNHB3WUUxdXEySHFmRVdOZjIxNE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0OTExNTk4MzQ2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCRDc2NTA3NzBCOURDRDk0NTAzMjZGMDRFOEQ3REMwMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NzEyNTUwfV0sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5dE5sR0NWOVRFMm9nNkNwZDZPWWRnIiwicGhvbmVJZCI6ImM0MDAwNDgwLWNkNTAtNDIyMi1iMjQwLWIyMGQ2ZjZjOGJmYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYc0ZGWEF0YytQZTNKZGs4SDdUV0lqd2c5bGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkdiaitpZmNtK0hlQWg5eVhwbVF5bm4wRFFJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyMzQ5MTE1OTgzNDYwOjc2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjE1NTA0Nzk5MTkxMjU1Ojc2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGZ3NDhjRkVPejhxY0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic2o3Nko2ZEhITVh5YkJ1d1llUHdpaWYrRDFNZ3JxUnRpUjhPTEhFYUlEWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibnZ2ZnpoTXA4WkxYSVhmYkp2RXh1MnJwNHY0TzMrY2xMV0NxazA4Q1Z1UmhCZWVIaXU2QW1XZHI3aGtMTWlCNjdpVDJwNyt5NXBZRVRIaFdFQW1GQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IjdDYjNSNjMrL1JmVWZ5OEZaSjZKOGhWbkxMVTdjZzFsaVJOVU5VTmd4d3B2VkRFQWlDWmdsVGFhVjJGdy9iTWl3bXRFTCtvRTlsOW1wWmdkOUlpcWpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTExNTk4MzQ2MDo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiSSsraWVuUnh6Rjhtd2JzR0hqOElvbi9nOVRJSzZrYllrZkRpeHhHaUEyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk3MTI1MDUsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTlVRIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Jo-byte-hub/JOSH-FORCE',
    OWNER_NAME : process.env.OWNER_NAME || "𝗝𝗼𝘀𝗵𝘂𝗮",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349115983460",  
              
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
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By 𝗝𝗼𝘀𝗵𝘂𝗮',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '𝗰𝗮𝗹𝗹 𝗺𝗲 𝗻𝗼𝘁,𝗶 𝘄𝗶𝗹𝗹 𝗯𝗹𝗼𝗰𝗸 𝘆𝗼𝘂 𝗶𝗳 𝘆𝗼𝘂 𝗰𝗮𝗹𝗹 𝗮𝗴𝗮𝗶𝗻',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "𝗝𝗢𝗦𝗛𝗧𝗘𝗖𝗛",
    BOT : process.env.BOT_NAME || '𝗝𝗢𝗦𝗛𝗧𝗘𝗖𝗛𝗡𝗢𝗟𝗢𝗚𝗬',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    CHAT_BOT : process.env.CHATBOT_INBOX || "no",
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
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
