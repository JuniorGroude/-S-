const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61554865965784"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝒊𝒅𝒊𝒐𝒕 𝑩𝒂𝒕𝒂𝒓𝒅 𝒊𝒏𝒅𝒊𝒈𝒏𝒆 𝒕𝒖 𝒑𝒐𝒔𝒆 𝒗𝒓𝒂𝒊𝒎𝒆𝒏𝒕 𝒅𝒆 𝒒𝒖𝒆𝒔𝒕𝒊𝒐𝒏 𝒔𝒕𝒖𝒑𝒊𝒅𝒆𝒔 𝒄𝒐𝒎𝒎𝒆 𝒕𝒐𝒏 𝒅𝒂𝒓𝒐𝒏 🖕. 𝑱𝒆 𝒏'𝒂𝒊 𝒑𝒂𝒔 𝒍𝒆 𝒕𝒆𝒎𝒑𝒔 𝒂 𝒑𝒆𝒓𝒅𝒓𝒆 𝒂𝒗𝒆𝒄 𝒅𝒆𝒔 𝒊𝒅𝒊𝒐𝒕𝒊𝒆𝒔. 𝑻𝒖 𝒅𝒆𝒗𝒓𝒂𝒊𝒔 𝒓𝒆𝒇𝒍𝒆𝒄𝒉𝒊𝒓 𝒂𝒗𝒂𝒏𝒕 𝒅𝒆 𝒑𝒐𝒔𝒆𝒓 𝒕𝒂 𝒒𝒖𝒆𝒔𝒕𝒊𝒐𝒏 ( 𝒋𝒆 𝒑𝒂𝒓𝒊𝒔 𝒒𝒖𝒆 𝒕𝒂 𝒖𝒏𝒆 𝒖𝒏𝒆 𝒑𝒆𝒕𝒊𝒕𝒆 𝒃𝒊𝒕𝒆😐) ", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝚕𝚎 𝚏𝚒𝚌𝚑𝚒𝚎𝚛 ?? ಠωಠ.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝐃𝐞𝐬𝐨𝐥𝐞́ 𝐛𝐨𝐬𝐬 TOMOURA 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐧'𝐞𝐱𝐢𝐬𝐭𝐞 𝐩𝐚𝐬 𝐝𝐚𝐧𝐬 𝐦𝐞𝐬 𝐜𝐦𝐝𝐬 🤏 [✖]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
}
