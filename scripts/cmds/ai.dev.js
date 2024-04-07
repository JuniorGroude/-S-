const axios = require('axios');

const Prefixes = [
  '/ai',
  'Tomoura',
  'salut',
  '+ai',
  'cc',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("⚪TOMOURA く悔 🟢 \n.....................\n 𝑽𝒆𝒏𝒖🚶𝒕𝒐𝒖𝒕 𝒅𝒓𝒐𝒊𝒕 𝒅𝒆𝒔 𝒑𝒓𝒐𝒇𝒐𝒏𝒅𝒆𝒖𝒓𝒔 ⚡ 𝒅𝒆𝒔 𝒕𝒆́𝒏𝒆̀𝒃𝒓𝒆𝒔👿 𝒑𝒐𝒖𝒓 𝒆́𝒍𝒖𝒄𝒊𝒅𝒆𝒓 𝒕𝒐𝒖𝒕🙌 𝒎𝒚𝒔𝒕𝒆̀𝒓𝒆.𝑷𝒐𝒔𝒆𝒛 𝒗𝒐𝒕𝒓𝒆 𝒑𝒓𝒆́𝒐𝒄𝒄𝒖𝒑𝒂𝒕𝒊𝒐𝒏👀 (?￣△￣)?.......?  ");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `,🟢TOMOURA く悔 ⚪
______________________________  
${answer}
(*・_・)ノ 🔴𝑻𝑶𝑴𝑶𝑼𝑹𝑨 く悔 🔵`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
