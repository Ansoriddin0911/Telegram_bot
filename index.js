
const TELEGRAM = require("node-telegram-bot-api");
const request = require("request");
const chalk = require("chalk");
const inline_keyboards = require("./inline_keyboards");

const TOKEN = '1798465756:AAFkL9peZnHDJJZuMqWnaB-dIHAZBFbUAE4';

console.log(chalk.black.bgYellow("\nBot has been started..."));

const bot = new TELEGRAM(TOKEN, {
	polling: true
});

bot.onText(/\/curse/, msg => {

	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "Mavjud bo'lgan valyuta kurslari:");

	bot.sendMessage(chatId, "<b><u>Valyutani tanlang</u></b>", {
		parse_mode: 'HTML',
		reply_markup: {
			inline_keyboard: inline_keyboards.inline_keyboard_1
		}
	});

});

bot.on('callback_query', query => {
	
	const { id } = query.message.chat;
	let { message_id } = query.message;

	if(query.data === 'right_1') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_2
			}
		});
	} 
	else if(query.data === 'right_2') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_3
			}
		});
	} 
	else if(query.data === 'right_3') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_4
			}
		});
	}
	else if(query.data === 'left_2') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_1
			}
		});
	}
	else if(query.data === 'left_3') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_2
			}
		});
	}
	else if(query.data === 'left_4') {
		bot.deleteMessage(id, message_id);
		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: inline_keyboards.inline_keyboard_3
			}
		});
	}
	else {
		request('https://nbu.uz/uz/exchange-rates/json/', (err, res, body) => {

		const data = JSON.parse(body);
		const result = data.filter(item => item.code === query.data)[0];

		let empty = elem => elem.length === 0 ? `Noma'lum` : elem;
		let sana = result.date.split(' ');

		let LastView = `
		<b>Valyuta nomi: </b><u>${result.title}</u>
	<b>1 ${result.code} = ${result.cb_price} UZS</b>
	Sotib olish narxi: <u>${empty(result.nbu_buy_price)}</u>
	Sotish narxi: <u>${empty(result.nbu_cell_price)}</u>
	Sana: ${sana[0]}
	Vaqt: ${sana[1]}
		`;
		bot.sendMessage(id, LastView, {
			parse_mode: 'HTML'
		});

		});
	};

});
