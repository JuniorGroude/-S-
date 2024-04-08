const { getStreamsFromAttachment } = global.utils;
module.exports = {
	config: {
		name: "notification",
		aliases: ["notify", "noti"],
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		longDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <tin nhắn>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: "Please enter the message you want to send to all groups",
			notification: "🔴📢 𝒗𝒐𝒕𝒓𝒆 𝒂𝒕𝒕𝒆𝒏𝒕𝒊𝒐𝒏 𝒔𝒗𝒑 𝒄𝒆𝒄𝒊 𝒆𝒔𝒕 𝒍𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒑𝒓𝒐𝒗𝒆𝒏𝒂𝒏𝒕 𝒅𝒖 𝒃𝒐𝒔𝒔 𝒅𝒆 𝒍𝒂 𝒍𝒊𝒈𝒖𝒆 𝒅𝒆𝒔 𝒎𝒆́𝒄𝒉𝒂𝒏𝒕🔵  (𝑁𝑒 𝑟𝑒́𝑎𝑔𝑖𝑠𝑠𝑒𝑧 𝑝𝑎𝑠 𝑎̀ 𝑐𝑒 𝑚𝑒𝑠𝑠𝑎𝑔𝑒✍️ 𝑠𝑖𝑛𝑜𝑛 𝑣𝑜𝑢𝑠 𝑠𝑒𝑟𝑒𝑧 𝑑𝑒́𝑠𝑖𝑛𝑡𝑒́𝑔𝑟𝑒́😈 )",
			sendingNotification: "Start sending notification from admin bot to %1 chat groups",
			sentNotification: "✅ 𝒍𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒂 𝒆́𝒕𝒆́ 𝒅𝒆́𝒍𝒊𝒗𝒓𝒆́ 𝒂  %1  𝒈𝒓𝒐𝒖𝒑𝒆 𝒂𝒗𝒆𝒄 𝒔𝒖𝒄𝒄𝒆̀𝒔 ",
			errorSendingNotification: "An error occurred while sending to %1 groups:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n────────────────\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
}
