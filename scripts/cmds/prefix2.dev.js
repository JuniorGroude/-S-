module.exports = {
    config: {
        name: "prefix",
        version: "1.0",
        author: "SobitxXue",
        countDown: 1,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "ok") return message.reply("your system prefix is [ + ]");
}
};
