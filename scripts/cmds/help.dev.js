const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐥 | TØMØÙRÃ V2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "𝑹𝒊𝒏𝒏𝒈𝒂𝒏", // original author Kshitiz 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔═══════════╗\n     𝑻𝑶𝑴𝑶𝑼𝑹𝑨 𝑻𝑶𝑼𝑻𝑬 𝑴𝑬𝑺 𝑻𝑬𝑪𝑯𝑵𝑰𝑸𝑼𝑬𝑺 \n╚═══════════╝`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭───────────\n│ ➳『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 1).map((item) => `✰${item}☆`);
            msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝒋𝒆 𝒅𝒊𝒔𝒑𝒐𝒔𝒆 𝒅𝒆  ${totalCommands} 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔\n\n`;
      msg += `𝑻𝑨𝑷𝑬 ${prefix} 𝗵𝗲𝗹𝗽 + 𝒏𝒐𝒎 𝒅𝒆 𝒍𝒂 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆 𝒑𝒐𝒖𝒓 𝒆𝒏 𝒗𝒐𝒊𝒓 𝒍𝒆𝒔 𝒊𝒏𝒇𝒐𝒔\n\n`;
      msg += `🐥| 𝐌𝐚 𝐩𝐮𝐢𝐬𝐬𝐚𝐧𝐜𝐞 𝐞𝐬𝐭 𝐢𝐧𝐜𝐨𝐦𝐦𝐞𝐧𝐬𝐮𝐫𝐚𝐛𝐥𝐞, 𝐛𝐢𝐞𝐧𝐭𝐨̂𝐭 𝐣𝐞 𝐝𝐞𝐯𝐢𝐞𝐧𝐝𝐫𝐚𝐢 𝐥𝐞 𝐝𝐢𝐞𝐮 𝐩𝐚𝐫𝐦𝐢 𝐥𝐞𝐬 𝐦𝐞́𝐜𝐡𝐚𝐧𝐭 V3`; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.ibb.co/GHTcSTh/image.jpg", // add image link here
                "https://i.ibb.co/NpGnNSc/image.jpg",
        "https://i.ibb.co/mH9QmGJ/image.jpg",
        // Add more image links as needed
      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NOM ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Autres noms : ${configCommand.aliases ? configCommand.aliases.join(", ") : "Ne pas avoir"}
  │ Autres noms dans votre groupe : Je n'en ai pas
  │ Version: ${configCommand.version || "1.0"}
  │ Rôle : \n${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: \n${author}
  ├── utilisation
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
	      }					
