
/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */


const TOKEN = process.env.TELEGRAM_TOKEN || '1798465756:AAFkL9peZnHDJJZuMqWnaB-dIHAZBFbUAE4';
const TelegramBot = require('node-telegram-bot-api');
const options = {
	webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.
	}
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://valyuta-kursi.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


// Just to ping!
bot.on('message', function onMessage(msg) {
	bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
});


// const TELEGRAM = require("node-telegram-bot-api");
// const request = require("request");
// const chalk = require("chalk");
// const inline_keyboards = require("./inline_keyboards");

// const TOKEN = '1798465756:AAFkL9peZnHDJJZuMqWnaB-dIHAZBFbUAE4';

// console.log(chalk.black.bgYellow("\nBot has been started..."));

// const bot = new TELEGRAM(TOKEN, {
// 	polling: true
// });

// bot.onText(/\/curse/, msg => {

// 	const chatId = msg.chat.id;

// 	bot.sendMessage(chatId, "Mavjud bo'lgan valyuta kurslari:");

// 	bot.sendMessage(chatId, "<b><u>Valyutani tanlang</u></b>", {
// 		parse_mode: 'HTML',
// 		reply_markup: {
// 			inline_keyboard: inline_keyboards.inline_keyboard_1
// 		}
// 	});

// });

// bot.on('callback_query', query => {
	
// 	const { id } = query.message.chat;
// 	let { message_id } = query.message;

// 	if(query.data === 'right_1') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_2
// 			}
// 		});
// 	} 
// 	else if(query.data === 'right_2') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_3
// 			}
// 		});
// 	} 
// 	else if(query.data === 'right_3') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_4
// 			}
// 		});
// 	}
// 	else if(query.data === 'left_2') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_1
// 			}
// 		});
// 	}
// 	else if(query.data === 'left_3') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_2
// 			}
// 		});
// 	}
// 	else if(query.data === 'left_4') {
// 		bot.deleteMessage(id, message_id);
// 		bot.sendMessage(id, "<b><u>Valyutani tanlang</u></b>", {
// 			parse_mode: 'HTML',
// 			reply_markup: {
// 				inline_keyboard: inline_keyboards.inline_keyboard_3
// 			}
// 		});
// 	}
// 	else {
// 		request('https://nbu.uz/uz/exchange-rates/json/', (err, res, body) => {

// 		const data = JSON.parse(body);
// 		const result = data.filter(item => item.code === query.data)[0];

// 		let empty = elem => elem.length === 0 ? `Noma'lum` : elem;
// 		let sana = result.date.split(' ');

// 		let LastView = `
// 		<b>Valyuta nomi: </b><u>${result.title}</u>
// 	<b>1 ${result.code} = ${result.cb_price} UZS</b>
// 	Sotib olish narxi: <u>${empty(result.nbu_buy_price)}</u>
// 	Sotish narxi: <u>${empty(result.nbu_cell_price)}</u>
// 	Sana: ${sana[0]}
// 	Vaqt: ${sana[1]}
// 		`;
// 		bot.sendMessage(id, LastView, {
// 			parse_mode: 'HTML'
// 		});

// 		});
// 	};

// });
